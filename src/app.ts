import { RenderErrorProps, RenderResultsProps } from './@types'
import { message } from './components'
import './reset.scss'
import { searchVideos, searchVideosId } from './services'
import './style.scss'

export const handleSearch = () => {
  const $times = [...document.querySelectorAll<HTMLInputElement>('.time-container input')]
  const $search = document.querySelector<HTMLInputElement>('.search-container input')
  const $button = document.querySelector<HTMLButtonElement>('.submit-button')
  const $results = document.querySelector<HTMLDivElement>('.results-container')
  if ($times?.length !== 7 || !$search || !$button || !$results) return

  $button?.addEventListener('click', async (e) => {
    e.preventDefault()

    // const value = $search.value
    const value = 'test'

    // const times = $times.map((time) => {
    //   if (!time.value) return 0
    //   return Number(time.value)
    // })
    const times = [15, 120, 30, 150, 20, 40, 90]

    const hasTime = times.find((time) => time !== 0)

    if (!value && !hasTime) return renderError({ container: $results, error: 'Informe a disponibilidade, em minutos, e uma palavra-chave' })
    if (!value) return renderError({ container: $results, error: 'Informe uma palavra-chave' })
    if (!hasTime) return renderError({ container: $results, error: 'Informe a disponibilidade, em minutos' })

    try {
      const videos = await search(value)
      if (!videos?.length) return console.log('Nenhum vídeo encontrado para a busca')
      renderResults({ videos, times })
    } catch (error) {
      console.log(error)
      return renderError({ container: $results, error: 'Ocorreu um erro inesperado, tente novamente mais tarde...' })
    }
  })
}

const renderError = ({ container, error }: RenderErrorProps) => {
  const messageElem = message({ message: error, status: 'error' })
  container.innerHTML = ''
  container.appendChild(messageElem)
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
