import './styles.scss'

import { MostFoundWordsProps, mostFoundWords } from '../../utils'

interface RenderWordsResultsProps extends MostFoundWordsProps {
  container: HTMLElement
}

export const renderWordsResults = ({ videos, container }: RenderWordsResultsProps) => {
  const results = mostFoundWords({ videos })

  const wordsContainer = document.createElement('div')
  wordsContainer.classList.add('words-container')
  container.appendChild(wordsContainer)

  const wordsTitle = document.createElement('h3')
  wordsTitle.classList.add('words-title')
  wordsTitle.textContent = 'Principais palavras-chave encontradas nesta busca:'
  wordsContainer.appendChild(wordsTitle)

  const wordsContent = document.createElement('div')
  wordsContent.classList.add('words-content')
  wordsContainer.appendChild(wordsContent)

  results.forEach((result) => {
    const word = result[0]
    const recurrence = result[1]

    const item = document.createElement('p')
    item.classList.add('word')
    item.textContent = word

    const recurrenceItem = document.createElement('span')
    recurrenceItem.textContent = `(${recurrence})`
    item.appendChild(recurrenceItem)

    wordsContent.appendChild(item)
  })
}
