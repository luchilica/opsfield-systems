"""
MCP-обёртка для crawl4ai (stdio-транспорт для Claude Desktop).

Запускается из claude_desktop_config.json командой:
    C:\\crawl4ai-mcp\\venv\\Scripts\\python.exe -X utf8 -u C:\\crawl4ai-mcp\\mcp_wrapper.py

Предоставляет два инструмента:
  - crawl(url)             -> markdown одной страницы
  - batch_crawl(urls)      -> markdown для списка страниц
"""

from fastmcp import FastMCP
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode

mcp = FastMCP("crawl4ai")

# Глобальные настройки браузера. verbose=False — важно, чтобы crawl4ai
# не писал логи в stdout и не ломал JSON-RPC поток MCP.
BROWSER_CFG = BrowserConfig(headless=True, verbose=False)


def _extract_markdown(result) -> str:
    """markdown в разных версиях crawl4ai бывает объектом или строкой."""
    md = getattr(result, "markdown", None)
    if md is None:
        return ""
    raw = getattr(md, "raw_markdown", None)
    if raw is not None:
        return raw
    return str(md)


async def _crawl_one(crawler, url: str, run_cfg: CrawlerRunConfig) -> dict:
    try:
        result = await crawler.arun(url=url, config=run_cfg)
        if not getattr(result, "success", False):
            return {
                "url": url,
                "success": False,
                "error": getattr(result, "error_message", None) or "unknown error",
                "status_code": getattr(result, "status_code", None),
            }
        return {
            "url": url,
            "success": True,
            "status_code": getattr(result, "status_code", None),
            "markdown": _extract_markdown(result),
        }
    except Exception as e:
        return {"url": url, "success": False, "error": repr(e)}


@mcp.tool()
async def crawl(url: str, bypass_cache: bool = True) -> dict:
    """Скачать одну страницу и вернуть очищенный markdown.

    Args:
        url: адрес страницы (http/https).
        bypass_cache: True — всегда свежая загрузка (по умолчанию).
    """
    run_cfg = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS if bypass_cache else CacheMode.ENABLED,
        verbose=False,
    )
    async with AsyncWebCrawler(config=BROWSER_CFG) as crawler:
        return await _crawl_one(crawler, url, run_cfg)


@mcp.tool()
async def batch_crawl(urls: list[str], bypass_cache: bool = True) -> list:
    """Скачать несколько страниц и вернуть markdown для каждой.

    Args:
        urls: список адресов.
        bypass_cache: True — всегда свежая загрузка (по умолчанию).
    """
    run_cfg = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS if bypass_cache else CacheMode.ENABLED,
        verbose=False,
    )
    results = []
    async with AsyncWebCrawler(config=BROWSER_CFG) as crawler:
        for u in urls:
            results.append(await _crawl_one(crawler, u, run_cfg))
    return results


if __name__ == "__main__":
    # По умолчанию FastMCP запускает stdio-транспорт — то, что нужно Claude Desktop.
    mcp.run()
