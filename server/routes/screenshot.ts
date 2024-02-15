import process from 'node:process'
import type { Browser } from 'puppeteer'
import puppeteer from 'puppeteer'
import { minioClient } from '~/server/utils/minio'

export default defineCachedEventHandler(async (event) => {
  const query = getQuery<{ url: string, title: string, colorMode: 'dark' | 'light' }>(event)

  if (!query.url || !query.title) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Incorrect parameters, please provide the URL and title',
    })
  }

  const objectName = `${query.title.replace(' ', '-')}-${query.colorMode}.jpg`
  const bucketName = 'screenshots'

  let browser: Browser | undefined

  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: `ws://chrome.josephanson.com?token=${process.env.CHROME_TOKEN}`,
    })

    const page = await browser.newPage()
    await page.setViewport({
      width: 1400,
      height: 1080,
    })

    await page.emulateMediaFeatures([
      query.colorMode === 'light' ? { name: 'prefers-color-scheme', value: 'light' } : { name: 'prefers-color-scheme', value: 'dark' },
    ])
    await new Promise(resolve => setTimeout(resolve, 1000))
    await page.goto(query.url, { timeout: 10000000, waitUntil: 'load' })

    // Capture screenshot and save it in the current folder:
    const screenshot = await page.screenshot()

    await minioClient.putObject(bucketName, objectName, screenshot)

    // eslint-disable-next-line no-console
    console.log(`Screenshot has been captured successfully`)

    return `http://${process.env.MINIO_URL}:9000/${bucketName}/${objectName}`
  }
  catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Screenshot failed to capture: ${query.url}`, err)

    throw createError({
      statusCode: 400,
      statusMessage: `screenshot failed to capture: ${query.url}`,
    })
  }
  finally {
    browser?.close()
  }
}, {
  maxAge: 60 * 60 * 24 * 7,
  name: 'screenshot',
  group: 'screenshots',
})
