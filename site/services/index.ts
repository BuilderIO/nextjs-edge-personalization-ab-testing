import * as moltin from '@moltin/sdk'
import { config } from './config'

export const MoltinGateway = moltin.gateway
export const moltinParam = {
  host: config.endpointURL,
  client_id: config.clientId,
  client_secret: config.clientSecret,
}

const imageHrefCache: { [key: string]: string } = {}

const imageMimeTypes = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/jp2',
  'image/jxr',
]

// Loads a file with a provided id and returns its url if it's mime type is an image or undefined otherwise
export async function loadImageHref(
  imageId: string
): Promise<string | undefined> {
  if (imageHrefCache[imageId]) {
    return imageHrefCache[imageId]
  }

  const moltin = MoltinGateway(moltinParam)
  const result = await moltin.Files.Get(imageId)

  if (imageMimeTypes.indexOf(result.data.mime_type) === -1) {
    return undefined
  }

  imageHrefCache[imageId] = result.data.link.href

  return result.data.link.href
}

export async function getProductById(
  productId: string
): Promise<moltin.PcmProduct> {
  const moltin = MoltinGateway({
    host: config.endpointURL,
    client_id: config.clientId,
    client_secret: config.clientSecret,
  })
  const result = await moltin.PCM.Get(productId)
  const product = result.data
  return product
}
