import { MessageProps } from './types'

export const message = ({ message, status }: MessageProps) => {
  const text = document.createElement('p')
  text.classList.add('message')
  if (status) text.classList.add(status)
  text.textContent = message
  return text
}
