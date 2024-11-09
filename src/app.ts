import { searchVideos, searchVideosId } from './modules'
import './reset.scss'
import './style.scss'

const search = async (term: string) => {
  const videosId = await searchVideosId(term)
  const videos = await searchVideos(videosId)
  return videos
}

export const handleSearch = () => {
  const $search = document.querySelector<HTMLInputElement>('.search-container input')
  const $button = document.querySelector<HTMLButtonElement>('.submit-button')
  const $times = [...document.querySelectorAll<HTMLInputElement>('.time-container input')]
  if (!$search || !$button || $times?.length !== 7) return

  $button?.addEventListener('click', async (e) => {
    e.preventDefault()

    const value = $search.value
    if (!value) return console.log('Precisa de um termo para a busca')

    const times = $times.map((time) => {
      if (!time.value) return 0
      return Number(time.value)
    })

    const hasTime = times.find((time) => time !== 0)
    if (!hasTime) return console.log('Precisa de pelo menos um tempo para a busca')

    const result = await search(value)
    console.log(result)
  })
}
