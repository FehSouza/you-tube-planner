import './styles.scss'

export interface MessageProps {
  text: string
  status: 'default' | 'warning' | 'error'
}

export const message = ({ text, status }: MessageProps) => {
  const textElem = document.createElement('p')
  textElem.classList.add('message')
  textElem.classList.add(status)
  textElem.textContent = text
  return textElem
}
