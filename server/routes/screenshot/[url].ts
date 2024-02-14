import type { Browser } from 'puppeteer'
import puppeteer from 'puppeteer'

export default eventHandler(async () => {
  let browser: Browser | undefined
  try {
    // eslint-disable-next-line node/prefer-global/process
    browser = await puppeteer.connect({ browserWSEndpoint: `ws://chrome.josephanson.com?token=${process.env.CHROME_TOKEN}` })
    const page = await browser.newPage()
    await page.goto('https://www.josephanson.com')

    console.log('Taking screenshot')

    return await page.screenshot()
  }
  finally {
    await browser?.close()
  }
})
