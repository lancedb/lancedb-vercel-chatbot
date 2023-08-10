import { load, type Element } from 'cheerio';

interface Entry {
  link: string;
  text: string;
}

async function getWebsiteSitemap(url: string, pages: number): Promise<string[]> {
  const response = await fetch(url);
  const $ = load(await response.text());

  const sitemapLinks: string[] = $('loc')
    .map((index: number, element: Element) => $(element).text().trim())
    .get();

  return sitemapLinks.slice(0, pages);
}

async function getEntriesFromLinks(links: string[]): Promise<Entry[]> {
  let allEntries: Entry[] = [];

  for (const link of links) {
    console.log('Scraping ', link);
    try {
      const response = await fetch(link);
      const $ = load(await response.text());

      const contentArray: string[] = [];
      $('p').each((index: number, element: Element) => {
        contentArray.push($(element).text().trim());
      });

      const content = contentArray
        .join('\n')
        .split('\n')
        .filter(line => line.length > 0)
        .map(line => ({ link: link, text: line }));

      allEntries = allEntries.concat(content);
    } catch (error) {
      console.error(`Error processing ${link}:`, error);
    }
  }

  return allEntries;
}

export async function getDomObjects(url: string, pages: number): Promise<Entry[]> {
  const sitemapUrls = await getWebsiteSitemap(url, pages);
  const allEntries = await getEntriesFromLinks(sitemapUrls);
  return allEntries;
}
