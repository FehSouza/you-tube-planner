import { getVideosId } from '../../services'

const MAX_VIDEOS = 200

const getVideosIdFormatted = async (query: string, pageToken = '') => {
  const result = await getVideosId(query, pageToken)
  if (!result.items) return { ids: [], nextPageToken: undefined }

  const ids = result.items?.map((item) => item.id?.videoId)

  const formattedResult = {
    ids,
    nextPageToken: result.nextPageToken,
  }

  return formattedResult
}

export const searchVideosId = async (term: string) => {
  let ids: string[] = []
  let pageToken: string | undefined = ''

  while (ids.length < MAX_VIDEOS && pageToken !== undefined) {
    const videosId = await getVideosIdFormatted(term, pageToken)

    ids = [...ids, ...videosId.ids]
    pageToken = videosId.nextPageToken ?? undefined
  }

  return ids.slice(0, MAX_VIDEOS)
}
