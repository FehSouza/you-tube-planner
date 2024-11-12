import { Video } from '../../../@types'

export interface VideosByTimeProps {
  videos: Video[]
  times: number[]
}

export const videosByTime = ({ videos, times }: VideosByTimeProps) => {
  const maxTime = Math.max(...times)

  let week = 1
  let currentTimeIndex = 0
  let currentTime = times[currentTimeIndex]

  const results = videos.reduce((acc, video) => {
    const duration = video.durationInSeconds

    if (duration > maxTime) {
      if (!acc.ignored) return { ...acc, ignored: { ignoredVideos: [video] } }
      return { ...acc, ignored: { ignoredVideos: [...acc.ignored.ignoredVideos, video] } }
    }

    while (duration > currentTime) {
      currentTimeIndex === 6 ? week++ : week
      currentTimeIndex === 6 ? (currentTimeIndex = 0) : currentTimeIndex++
      currentTime = times[currentTimeIndex]
    }

    currentTime = currentTime - duration
    const keyWeek = `week${week}`
    const keyDay = `day${currentTimeIndex}`

    if (!acc[keyWeek]) return { ...acc, [keyWeek]: { [keyDay]: [video] } }
    if (!acc[keyWeek][keyDay]) return { ...acc, [keyWeek]: { ...acc[keyWeek], [keyDay]: [video] } }
    return { ...acc, [keyWeek]: { ...acc[keyWeek], [keyDay]: [...acc[keyWeek][keyDay], video] } }
  }, {} as Record<string, Record<string, Video[]>>)

  return results
}
