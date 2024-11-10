import { delay, http, HttpResponse } from 'msw'
import { VideosId } from '../../@types'
import { baseURL } from '../../api'
import { MOCK_VIDEOS_ID } from '../../mocks/videosId'
import { formatVideosId } from '../../utils'

const MAX_VIDEOS = 200

const getVideosId = async (query: string, pageToken = '') => {
  const endpoint = `${baseURL}/search`

  const searchParams = new URLSearchParams({
    q: query,
    type: 'video',
    maxResults: '50',
    pageToken: pageToken,
    key: import.meta.env.VITE_API_KEY,
  })

  const response = await fetch(`${endpoint}?${searchParams.toString()}`)
  const result: VideosId = await response.json()
  return result
}

const getVideosIdFormatted = async (query: string, pageToken = '') => {
  const result = await getVideosId(query, pageToken)
  if (!result.items) return { ids: [], nextPageToken: undefined }

  return formatVideosId(result)
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

export const mockGetVideosId = http.get(`${baseURL}/search`, async () => {
  await delay()
  return HttpResponse.json(MOCK_VIDEOS_ID)
})
