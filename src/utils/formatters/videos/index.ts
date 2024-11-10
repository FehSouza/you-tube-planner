import { Video, VideoItem } from '../../../@types'

export const formatVideos = (videos: VideoItem[]) => {
  const formattedResult = videos.map((video) => {
    const videoDTO: Video = {
      id: video.id,
      title: video.snippet?.title,
      description: video.snippet?.description,
      thumbnail: video.snippet?.thumbnails?.default,
      duration: video.contentDetails?.duration,
    }

    return videoDTO
  })

  return formattedResult
}
