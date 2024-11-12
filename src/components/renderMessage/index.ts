import { message } from '../message'

interface RenderMessageProps {
  container: HTMLElement
  text: string
  status?: string
}

export const renderMessage = ({ container, text, status }: RenderMessageProps) => {
  const messageElem = message({ message: text, status })
  container.innerHTML = ''
  container.appendChild(messageElem)
}
