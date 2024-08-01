import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { PropsWithChildren } from 'react'
import { WagmiProvider, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'

const queryClient = new QueryClient()
const projectId = '7a9877f9af5a0128f75dfab917a49fbd'

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal',
  url: 'http://localhost:5173',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const chains = [mainnet] as const
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  transports: {
    [mainnet.id]: http(`https://virtual.mainnet.rpc.tenderly.co/ed0d2ba6-9b9d-4532-b69f-227a23c0ba8f`),
  },
})

createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId,
  enableSwaps: false,
})

export const Web3ModalProvider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
