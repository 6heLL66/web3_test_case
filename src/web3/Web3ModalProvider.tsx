import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { PropsWithChildren } from 'react'
import { WagmiProvider } from 'wagmi'
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
//   transports: {
//     [mainnet.id]: http(`https://virtual.mainnet.rpc.tenderly.co/0515d3e6-c8d3-4103-ba1a-18a86d98df73`),
//   },
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
