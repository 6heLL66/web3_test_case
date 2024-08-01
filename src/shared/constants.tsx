import { EthIcon } from './icons/eth'
import { WethIcon } from './icons/weth'

export const TOKENS = {
  ETH: 'ETH',
  WETH: 'WETH',
} as const

export const TOKEN_ICONS = {
  ETH: <EthIcon size='24px' />,
  WETH: <WethIcon size='24px' />,
} as const

export const TOKEN_ADDRESS = {
  ETH: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
} as const

export type Token = keyof typeof TOKENS
