import { delay, http, HttpResponse } from 'msw'
import { VideosId } from '../../@types'
import { baseURL } from '../../api'
import { MOCK_VIDEOS_ID } from '../../mocks/videosId'

export const getVideosId = async (query: string, pageToken = '') => {
  const endpoint = `${baseURL}/search`

  const searchParams = new URLSearchParams({
    q: query,
    type: 'video',
    maxResults: '50',
    pageToken: pageToken,
    key: import.meta.env.VITE_API_KEY,
  })

  try {
    const response = await fetch(`${endpoint}?${searchParams.toString()}`)
    const result: VideosId = await response.json()
    return result
  } catch (error) {
    console.log('service getVideosId Error:', error)
    return { items: [], nextPageToken: undefined }
  }
}

export const mockGetVideosId = http.get(`${baseURL}/search`, async () => {
  await delay()
  return HttpResponse.json(MOCK_VIDEOS_ID)
})
