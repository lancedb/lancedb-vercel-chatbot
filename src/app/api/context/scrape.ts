import puppeteer from 'puppeteer'

async function getWebsiteSitemap(url: string, pages: number): Promise<string[]> {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  // Navigate to the website's sitemap URL
  await page.goto(url)
  console.log(url)

  // Extract sitemap URLs from the page
  const sitemapLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('loc'))
    return links.map((link) => link.textContent?.trim() || '')
  })

  await browser.close()
  // limit the number of links we visit to 100
  return sitemapLinks.slice(0, pages)
}

async function getEntriesFromLinks(links: string[]): Promise<Entry[]> {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()
  let allEntries: Entry[] = []

  for (const link of links) {
    console.log('Scraping ', link)
    try {
      // Navigate to each link and wait for the page to load
      await page.goto(link, { waitUntil: 'domcontentloaded' })

      // Extract DOM objects from the page and push them into the array
      const entries: Entry[] = await page.evaluate(() => {
        const contentArray: string[] = []
        // Extract paragraphs
        const paragraphElements = document.querySelectorAll('p')
        paragraphElements.forEach((paragraph) => {
          contentArray.push(paragraph.textContent?.trim() || '')
        })

        const content = contentArray.join('\n').split('\n')
          .filter(line => line.length > 0)
          .map(line => ({ link: document.URL, text: line }))
        return content ?? []
      })
      allEntries = allEntries.concat(entries)
    } catch (error) {
      console.error(`Error processing ${link}:`, error)
    }
  }

  await browser.close()
  return allEntries
}

export async function getDomObjects(url: string, pages: number) {
  const sitemapUrls = await getWebsiteSitemap(url, pages)
  const allEntries = await getEntriesFromLinks(sitemapUrls)
  return allEntries
}