export default eventHandler(async (event) => {
  defaultContentType(event, 'application/pdf')

  const resume = await minioClient.getObject('josephanson-assets', 'joseph-anson-resume.pdf')

  return resume
})
