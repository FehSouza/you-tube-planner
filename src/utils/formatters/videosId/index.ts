import { VideosId } from '../../../@types'

export const formatVideosId = (videosId: VideosId) => {
  const ids = videosId.items?.map((item) => item.id?.videoId)

  const formattedResult = {
    ids,
    nextPageToken: videosId.nextPageToken,
  }

  return formattedResult
}
