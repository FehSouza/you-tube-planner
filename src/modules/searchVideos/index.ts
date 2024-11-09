import { Video } from '../../@types'
import { getVideos } from '../../services'

const getVideosFormatted = async (id: string) => {
  const result = await getVideos(id)
  if (!result.items) return []

  const formattedResult = result.items.reduce((acc, item) => {
    const video = {
      id: item.id,
      title: item.snippet?.title,
      description: item.snippet?.description,
      thumbnail: item.snippet?.thumbnails?.default,
      duration: item.contentDetails?.duration,
    }

    return (acc = [...acc, video])
  }, [] as Video[])

  return formattedResult
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
