import type { Browser } from 'puppeteer'
import puppeteer from 'puppeteer'
import type { Project } from '~/types'

export default defineTask({
  meta: {
    name: 'screenshots',
    description: 'Create screenshots of all projects',
  },
  async run({ payload }) {
    const project = payload as unknown as Project
    for (const mode of ['dark', 'light']) {
      const objectName = `${project.id}-${mode}.jpg`
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
          mode === 'light'
            ? { name: 'prefers-color-scheme', value: 'light' }
            : {
                name: 'prefers-color-scheme',
                value: 'dark',
              },
        ])
        await page.goto(project.link, { timeout: 10000000, waitUntil: 'load' })

        await new Promise(resolve => setTimeout(resolve, 10000))

        // Capture screenshot and save it in the current folder:
        const screenshot = await page.screenshot()

        await minioClient.putObject(bucketName, objectName, screenshot)

        // eslint-disable-next-line no-console
        console.log(`Screenshot has been captured successfully: ${project.link} - mode: ${mode}`)
      }
      catch (err) {
        // eslint-disable-next-line no-console
        console.log(`Screenshot failed to capture: ${project.link}`, err)

        throw createError({
          statusCode: 400,
          statusMessage: `screenshot failed to capture: ${project.link}`,
        })
      }
      finally {
        browser?.close()
      }
    }

    return { result: 'Success' }
  },
})
