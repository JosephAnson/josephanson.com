import process from 'node:process'
import type { Browser } from 'puppeteer'
import puppeteer from 'puppeteer'

export default defineCachedEventHandler(async (event) => {
  const query = getQuery<{ url: string, colorMode: 'dark' | 'light' }>(event)

  // eslint-disable-next-line no-console
  console.log('Taking screenshot', query)

  if (!query.url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID not passed correctly',
    })
  }

  let browser: Browser | undefined
  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: `ws://chrome.josephanson.com?token=${process.env.CHROME_TOKEN}`,
    })

    const page = await browser.newPage()
    await page.setViewport({
      width: 1280,
      height: 800,
    })
    await page.emulateMediaFeatures([
      query.colorMode === 'light' ? { name: 'prefers-color-scheme', value: 'light' } : { name: 'prefers-color-scheme', value: 'dark' },
    ])
    await page.goto(query.url, { timeout: 10000 * 60 * 5, waitUntil: 'load' })

    await new Promise(resolve => setTimeout(resolve, 1000))

    // Capture screenshot and save it in the current folder:
    return await page.screenshot()
  }
  catch (err) {
    throw createError({
      statusCode: 400,
      statusMessage: `screenshot failed to capture: ${query.url}`,
    })
  }
  finally {
    await browser?.close()
    // eslint-disable-next-line no-console
    console.log(`Screenshot has been captured successfully`)
  }
}, {
  swr: true,
  maxAge: 60 * 60 * 24 * 7,
  name: 'screenshot',
  group: 'screenshots',
})
