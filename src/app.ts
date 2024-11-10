import { Video } from './@types'
import './reset.scss'
import { searchVideos, searchVideosId } from './services'
import './style.scss'

interface RenderResultsProps {
  videos: Video[]
  times: number[]
}

export const handleSearch = () => {
  const $search = document.querySelector<HTMLInputElement>('.search-container input')
  const $button = document.querySelector<HTMLButtonElement>('.submit-button')
  const $times = [...document.querySelectorAll<HTMLInputElement>('.time-container input')]
  if (!$search || !$button || $times?.length !== 7) return

  $button?.addEventListener('click', async (e) => {
    e.preventDefault()

    // const value = $search.value
    const value = 'test'
    if (!value) return console.log('Precisa de um termo para a busca')

    // const times = $times.map((time) => {
    //   if (!time.value) return 0
    //   return Number(time.value)
    // })
    const times = [15, 120, 30, 150, 20, 40, 90]

    const hasTime = times.find((time) => time !== 0)
    if (!hasTime) return console.log('Precisa de pelo menos um tempo para a busca')

    try {
      const videos = await search(value)
      if (!videos?.length) return console.log('Nenhum vídeo encontrado para a busca')
      renderResults({ videos, times })
    } catch (error) {
      console.log(error)
    }
  })
}

const search = async (term: string) => {
  const videosId = await searchVideosId(term)
  const videos = await searchVideos(videosId)
  return videos
}

const renderResults = ({ videos, times }: RenderResultsProps) => {
  console.log(videos, times)

  const maxTime = Math.max(...times)
  console.log(maxTime)
}
