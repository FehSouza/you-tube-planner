import { Video } from '../../../@types'

export interface VideosByTimeProps {
  videos: Video[]
  times: number[]
}

export const videosByTime = ({ videos, times }: VideosByTimeProps) => {
  const maxTime = Math.max(...times)

  let week = 0
  let currentTimeIndex = 0
  let currentTime = times[currentTimeIndex]

  const results = videos.reduce((acc, video) => {
    const duration = video.durationInSeconds

    if (duration > maxTime) {
      if (!acc['ignored']) return { ...acc, ['ignored']: [video] }
      return { ...acc, ['ignored']: [...acc['ignored'], video] }
    }

    while (duration > currentTime) {
      currentTimeIndex === 6 ? week++ : week
      currentTimeIndex === 6 ? (currentTimeIndex = 0) : currentTimeIndex++
      currentTime = times[currentTimeIndex]
    }

    currentTime = currentTime - duration
    const key = `week${week}-day${currentTimeIndex}`

    if (!acc[key]) return { ...acc, [key]: [video] }
    return { ...acc, [key]: [...acc[key], video] }
  }, {} as Record<string, Video[]>)

  return results
}
