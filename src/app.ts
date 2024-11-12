import { renderMessage, renderPlanningResults, renderWordsResults } from './components'
import './reset.scss'
import { searchVideos, searchVideosId } from './services'
import './style.scss'

export const handleSearch = () => {
  const $times = [...document.querySelectorAll<HTMLInputElement>('.time-container input')]
  const $search = document.querySelector<HTMLInputElement>('.search-container input')
  const $button = document.querySelector<HTMLButtonElement>('.submit-button')
  const $results = document.querySelector<HTMLDivElement>('.results-container')
  const $content = document.querySelector<HTMLDivElement>('.results-container .content')
  if ($times?.length !== 7 || !$search || !$button || !$results || !$content) return

  $button?.addEventListener('click', async (e) => {
    e.preventDefault()

    const value = $search.value

    const times = $times.map((time) => {
      if (!time.value) return 0
      return Number(time.value) * 60
    })

    const hasTime = times.find((time) => time !== 0)

    if (!value && !hasTime)
      return renderMessage({ container: $content, text: 'Informe a disponibilidade (minutos) e a palavra-chave', status: 'error' })
    if (!value) return renderMessage({ container: $content, text: 'Informe a palavra-chave', status: 'error' })
    if (!hasTime) return renderMessage({ container: $content, text: 'Informe a disponibilidade (minutos)', status: 'error' })

    try {
      $results.classList.add('loading')
      $content.innerHTML = ''

      const videos = await search(value)
      if (!videos?.length) return renderMessage({ container: $content, text: 'Sem vídeos para a palavra-chave', status: 'warning' })

      renderWordsResults({ videos, container: $content })
      renderPlanningResults({ videos, times, container: $content })
    } catch (error) {
      console.log(error)
      return renderMessage({ container: $content, text: 'Ocorreu um erro inesperado, tente novamente mais tarde...', status: 'error' })
    } finally {
      $results.classList.remove('loading')
    }
  })
}

const search = async (term: string) => {
  const videosId = await searchVideosId(term)
  const videos = await searchVideos(videosId)
  return videos
}
