import { Video } from '../../../@types'

export interface MostFoundWordsProps {
  videos: Video[]
}

export const mostFoundWords = ({ videos }: MostFoundWordsProps) => {
  const words = videos.reduce((acc, video) => {
    const regex = /[.,!?/";:(){}\[\]\-]/g

    const title = video.title?.replace(regex, '')?.toLowerCase()?.split(' ')
    const description = video.description?.replace(regex, '')?.toLowerCase()?.split(' ')
    return [...acc, ...title, ...description]
  }, [] as string[])

  const wordRecurrence = words.reduce((acc, word) => {
    if (word.includes('https://') || word.includes('http://')) return acc
    if (word.length <= 4) return acc
    if (!acc[word]) return { ...acc, [word]: 1 }
    return { ...acc, [word]: acc[word] + 1 }
  }, {} as Record<string, number>)

  const wordRecurrenceSorted = Object.entries(wordRecurrence).sort(([, a], [, b]) => b - a)
  return wordRecurrenceSorted.splice(0, 5)
}
