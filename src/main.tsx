import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import './index.css'
import { Web3ModalProvider } from './web3/Web3ModalProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Web3ModalProvider>
    <App />
  </Web3ModalProvider>,
)
