import type { TaskPayload } from 'nitropack/types'

export default eventHandler(async (event) => {
  // @ts-expect-error mismatch between client and server types
  const payload = await queryCollection(event, 'projects').all()

  payload.map((project) => {
    project.id = project.title?.toLowerCase().replaceAll(/[ &]/g, '-').replaceAll(/---/g, '-')
    return project
  })

  const projectResults = await runTask('screenshots', { payload } as TaskPayload)

  return {
    result: projectResults,
  }
})
