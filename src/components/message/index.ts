import './styles.scss'

interface MessageProps {
  message: string
  status?: string
}

export const message = ({ message, status }: MessageProps) => {
  const text = document.createElement('p')
  text.classList.add('message')
  if (status) text.classList.add(status)
  text.textContent = message
  return text
}
