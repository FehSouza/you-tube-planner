import { delay, http, HttpResponse } from 'msw'
import { Videos } from '../../@types'
import { baseURL } from '../../api'
import { MOCK_VIDEOS } from '../../mocks'

export const getVideos = async (id: string) => {
  const endpoint = `${baseURL}/videos`

  const searchParams = new URLSearchParams({
    id,
    part: 'snippet,contentDetails',
    key: import.meta.env.VITE_API_KEY,
  })

  try {
    const response = await fetch(`${endpoint}?${searchParams.toString()}`)
    const result: Videos = await response.json()
    return result
  } catch (error) {
    console.log('service getVideos Error:', error)
    return { items: [] }
  }
}

export const mockGetVideos = http.get(`${baseURL}/videos`, async () => {
  await delay()
  return HttpResponse.json(MOCK_VIDEOS)
})
