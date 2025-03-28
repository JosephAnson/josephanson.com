import type { TaskPayload } from 'nitropack/types'
import { z } from 'zod'

const schema = z.object({
  id: z.string(),
})

export default eventHandler(async (event) => {
  const query = await getValidatedQuery(event, schema.parse)

  // @ts-expect-error mismatch between client and server types
  const payload = await queryCollection(event, 'projects').path(`/projects/${query.id}`).first()

  payload.id = payload.title?.toLowerCase().replaceAll(/[ &]/g, '-').replaceAll(/---/g, '-')

  const projectResults = await runTask('screenshots', { payload } as TaskPayload)

  return {
    result: projectResults,
  }
})
