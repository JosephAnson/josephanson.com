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

    await page.goto('https://josephanson.com/resume', { timeout: 10000000, waitUntil: 'networkidle0' })

    consola.info('loading page resume')

    await page.emulateMediaType('print')
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }])

    return await page.pdf({
      format: 'a4',
      margin: {
        left: 40,
        top: 40,
        right: 40,
        bottom: 40,
      },
      printBackground: true,
      pageRanges: '1-',
      scale: 0.8,
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
