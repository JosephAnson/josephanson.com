import type { Browser } from 'puppeteer'
import { Buffer } from 'node:buffer'
import consola from 'consola'
import puppeteer from 'puppeteer'

export default eventHandler(async () => {
  let browser: Browser | undefined
  const bucketName = 'josephanson-assets'
  const key = 'joseph-anson-resume.pdf'

  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: `ws://chrome.josephanson.com?token=${process.env.CHROME_TOKEN}`,
    })
    const page = await browser.newPage()

    await page.goto('https://josephanson.com/resume', { timeout: 10000000, waitUntil: 'networkidle0' })

    consola.info('loading page resume')

    await page.emulateMediaType('print')
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }])

    await page.waitForSelector('body')
    await page.waitForNetworkIdle()

    await new Promise(resolve => setTimeout(resolve, 10000))

    const pdfBuffer = await page.pdf({
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

    // Store PDF in S3/MinIO
    await minioClient.putObject(bucketName, key, Buffer.from(pdfBuffer))

    consola.info(`Resume stored in S3: ${key}`)

    return 'Generated resume'
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
