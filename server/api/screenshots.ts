import { serverQueryContent } from '#content/server'
import type { TaskPayload } from 'nitropack/runtime'

export default eventHandler(async (event) => {
  const payload = await serverQueryContent(event, 'projects').where({ _dir: { $not: '' } }).find()

  payload.map((project) => {
    project.id = project.title?.toLowerCase().replaceAll(/[ &]/g, '-').replaceAll(/---/g, '-')
    return project
  })

  const projectResults = await runTask('screenshots', { payload } as TaskPayload)

  return {
    result: projectResults,
  }
})
