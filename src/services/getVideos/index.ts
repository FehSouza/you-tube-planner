import { delay, http, HttpResponse } from 'msw'
import { Video, Videos } from '../../@types'
import { baseURL } from '../../api'
import { MOCK_VIDEOS } from '../../mocks'
import { formatVideos } from '../../utils'

const getVideos = async (id: string) => {
  const endpoint = `${baseURL}/videos`

  const searchParams = new URLSearchParams({
    id,
    part: 'snippet,contentDetails',
    key: import.meta.env.VITE_API_KEY,
  })

  const response = await fetch(`${endpoint}?${searchParams.toString()}`)
  const result: Videos = await response.json()
  return result
}

const getVideosFormatted = async (id: string) => {
  const result = await getVideos(id)
  if (!result.items) return []

  return formatVideos(result.items)
}

export const searchVideos = async (ids: string[]) => {
  let videos: Video[] = []

  while (videos.length !== ids.length) {
    const chunks = ids.slice(videos.length, videos.length + 50).join(',')
    const videosChunk = await getVideosFormatted(chunks)

    videos = [...videos, ...videosChunk]
  }

  return videos
}

export const mockGetVideos = http.get(`${baseURL}/videos`, async () => {
  await delay()
  return HttpResponse.json(MOCK_VIDEOS)
})
