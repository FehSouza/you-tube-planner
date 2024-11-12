import { Video } from '../../../@types'

export interface MostFoundWordsProps {
  videos: Video[]
}

// Performance de 3392ms
// export const mostFoundWords = ({ videos }: MostFoundWordsProps) => {
//   const words = videos.reduce((acc, video) => {
//     const regex = /[.,!?/";:(){}\[\]\-]/g

//     const title = video.title?.replace(regex, '')?.toLowerCase()?.split(' ')
//     const description = video.description?.replace(regex, '')?.toLowerCase()?.split(' ')
//     return [...acc, ...title, ...description]
//   }, [] as string[])

//   const wordRecurrence = words.reduce((acc, word) => {
//     if (word.includes('https://') || word.includes('http://')) return acc
//     if (word.length <= 4) return acc
//     if (!acc[word]) return { ...acc, [word]: 1 }
//     return { ...acc, [word]: acc[word] + 1 }
//   }, {} as Record<string, number>)

//   const wordRecurrenceSorted = Object.entries(wordRecurrence).sort(([, a], [, b]) => b - a)
//   return wordRecurrenceSorted.splice(0, 5)
// }

// Performance de 20ms
export const mostFoundWords = ({ videos }: MostFoundWordsProps) => {
  const words: Record<string, number> = {}

  for (let index = 0; index < videos.length; index++) {
    const video = videos[index]
    const regex = /[.,!?/";:(){}\[\]\-]/g

    const title = video.title?.replace(regex, '')?.toLowerCase()?.split(' ')
    const description = video.description?.replace(regex, '')?.toLowerCase()?.split(' ')

    for (let wordIndex = 0; wordIndex < title.length; wordIndex++) {
      const word = title[wordIndex]
      if (word.includes('https://') || word.includes('http://')) continue
      if (word.length <= 4) continue
      if (words[word]) words[word] = words[word] + 1
      if (!words[word]) words[word] = 1
    }

    for (let wordIndex = 0; wordIndex < description.length; wordIndex++) {
      const word = description[wordIndex]
      if (word.includes('https://') || word.includes('http://')) continue
      if (word.length <= 4) continue
      if (words[word]) words[word] = words[word] + 1
      if (!words[word]) words[word] = 1
    }
  }

  const wordRecurrenceSorted = Object.entries(words).sort(([, a], [, b]) => b - a)
  return wordRecurrenceSorted.splice(0, 5)
}
