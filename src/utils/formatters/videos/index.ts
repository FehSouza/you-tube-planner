import { Video, VideoItem } from '../../../@types'
import { convertToSeconds } from '../time'

export const formatVideos = (videos: VideoItem[]) => {
  const formattedResult = videos.map((video) => {
    const duration = video.contentDetails?.duration.replace('PT', '')
    const durationFormatted = convertToSeconds(duration)

    const videoDTO: Video = {
      id: video.id,
      durationInSeconds: durationFormatted,
      title: video.snippet?.title,
      description: video.snippet?.description,
      thumbnail: video.snippet?.thumbnails?.default,
    }

    return videoDTO
  })

  return formattedResult
}
