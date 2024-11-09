import { handleSearch } from './app'

const configMock = async () => {
  if (import.meta.env.MODE === 'mock') {
    const { worker } = await import('./api_mocks/browser')
    await worker.start()
  }
}

const init = () => handleSearch()

configMock().then(() => init())
