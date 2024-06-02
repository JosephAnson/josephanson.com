import { serverQueryContent } from '#content/server'

export default eventHandler(async (event) => {
  const projects = await serverQueryContent(event, 'projects').where({ _dir: { $not: '' } }).find()

  projects.map((project) => {
    project.id = project.title?.toLowerCase().replaceAll(/[ &]/g, '-').replaceAll(/---/g, '-')
    return project
  })

  const projectPromises = projects.map(project => runTask('screenshots', { payload: project }))
  const projectResults = await Promise.all(projectPromises)

  return {
    result: projectResults,
  }
})
