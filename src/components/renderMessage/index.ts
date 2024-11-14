import { message, MessageProps } from '../message'

interface RenderMessageProps extends MessageProps {
  container: HTMLElement
}

export const renderMessage = ({ container, text, status }: RenderMessageProps) => {
  const messageElem = message({ text, status })
  container.innerHTML = ''
  container.appendChild(messageElem)
}
