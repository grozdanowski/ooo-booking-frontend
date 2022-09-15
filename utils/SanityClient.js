const sanityClient = require('@sanity/client')
const { default: getConfig } = require('next/config')

const { publicRuntimeConfig } = getConfig()

module.exports = sanityClient({
  projectId: publicRuntimeConfig.sanityApiProjectId,
  dataset: publicRuntimeConfig.sanityApiDataset,
  useCdn: false,
  apiVersion: '2022-09-14',
})