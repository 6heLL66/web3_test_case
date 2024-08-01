# React + TypeScript + Vite


# How to start in dev mode
 `yarn`
 `yarn dev`


# Functionality

- Authorizing by wallet connecting via "Wallet Connect" web3 modal

- Wrap ETH by using WETH token contract and unwrap WETH back to ETH with simple UI sending tx by you wallet

- Throwing errors and progress bars while trying to swap tokens


# Code structure

  -  main.tsx -> react app entry file
  -  web3/Web3ModalProvider -> react provider for "Wallet Connect" package with config for wagmi and web3 modal
  -  web3/abi.ts -> abi for WETH token contract
  -  shared/constants -> constats for token names and token contracts
  -  shared/utils -> formatBalance function for bigint balance formating
  -  shared/icons -> token icons
  -  shared/TokenInput -> reusable component for eth and weth inputs
  -  useWethWrapper -> hook for weth contract interaction and getting token balances
  -  components/ETHWrapper => main wrapper component that uses TokenInput components for amount input and controlling them, using hook useWethWrapper to wrap/unwrap     tokens and show errors

# CREDS
 - ### testnet public rpc: https://virtual.mainnet.rpc.tenderly.co/0515d3e6-c8d3-4103-ba1a-18a86d98df73
# DEMO

https://web3-test-case.vercel.app/

