import consola from 'consola'
import puppeteer from 'puppeteer'
import type { Browser } from 'puppeteer'

export default eventHandler(async (event) => {
  defaultContentType(event, 'application/pdf')

  let browser: Browser | undefined

  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: `ws://chrome.josephanson.com?token=${process.env.CHROME_TOKEN}`,
    })
    const page = await browser.newPage()

    await page.goto('https://josephanson.com/resume', { timeout: 10000000, waitUntil: 'load' })

    consola.info('loading page resume')

    await page.setViewport({ height: 3500, width: 900 })
    consola.info('loaded page resume')

    return await page.pdf({
      format: 'a4',
      margin: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      printBackground: true,
      pageRanges: '1-2',
    })
  }
  catch (err) {
    consola.error(`failed to create resume`, err)

    throw createError({
      statusCode: 400,
      statusMessage: `failed to create resume`,
    })
  }
  finally {
    browser?.close()
  }
})
