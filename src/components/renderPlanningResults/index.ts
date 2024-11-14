import './styles.scss'

import { DICTIONARY_DAY } from '../../dictionary'
import { VideosByTimeProps, videosByTime } from '../../utils'

interface RenderResultsProps extends VideosByTimeProps {
  container: HTMLElement
}

export const renderPlanningResults = ({ videos, times, container }: RenderResultsProps) => {
  const results = videosByTime({ videos, times })
  const weekResults = Object.entries(results)

  weekResults.forEach((weekResult) => {
    const [week, content] = weekResult
    const isIgnored = week.includes('ignored')

    const weekContainer = document.createElement('div')
    weekContainer.classList.add('week-container')
    if (isIgnored) weekContainer.classList.add('last')
    container.appendChild(weekContainer)

    const weekTitle = document.createElement('h3')
    weekTitle.classList.add('week-title')
    weekTitle.textContent = isIgnored ? 'Vídeos ignorados' : week.replace('week', 'Semana ')
    weekContainer.appendChild(weekTitle)

    const weekContent = document.createElement('div')
    weekContent.classList.add('week-content')
    weekContainer.appendChild(weekContent)

    const dayResults = Object.entries(content)

    dayResults.forEach((dayResult) => {
      const [day, content] = dayResult

      const dayContainer = document.createElement('div')
      dayContainer.classList.add('day-container')
      weekContent.appendChild(dayContainer)

      const dayTitle = document.createElement('h4')
      dayTitle.classList.add('day-title')
      dayTitle.textContent = DICTIONARY_DAY[day as keyof typeof DICTIONARY_DAY]
      dayContainer.appendChild(dayTitle)

      const dayContent = document.createElement('ul')
      dayContent.classList.add('day-content')
      dayContainer.appendChild(dayContent)

      content.forEach((video) => {
        const id = video.id
        const name = video.title
        const time = video.duration
        const timeFormatted = time.replace('H', 'h ').replace('M', 'min ').replace('S', 'seg')

        const item = document.createElement('li')
        item.classList.add('video-container')
        dayContent.appendChild(item)

        const title = document.createElement('a')
        title.href = `https://www.youtube.com/watch?v=${id}`
        title.target = 'blank'
        title.textContent = name
        item.appendChild(title)

        const duration = document.createElement('span')
        duration.textContent = `Duração: ${timeFormatted}`
        title.appendChild(duration)
      })
    })
  })
}
