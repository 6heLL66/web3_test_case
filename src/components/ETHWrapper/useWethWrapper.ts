import { useAccount, useBalance, useReadContracts, useWriteContract } from 'wagmi'
import { TOKEN_ADDRESS } from '../../shared/constants'
import { erc20Abi } from 'viem'
import { formatBalance } from '../../shared/utils'
import { ABI } from '../../web3/abi'
import { GetBalanceErrorType, ReadContractsErrorType, WriteContractErrorType } from 'wagmi/actions'

type ReturnType = {
    balances: string[]
    error: WriteContractErrorType | null
    isPending: boolean
    balanceError: ReadContractsErrorType | GetBalanceErrorType | null
    balanceIsFetching: boolean
    depositWeth: () => void
    withdrawWeth: () => void
}

export const useWethWrapper = ({payTokenValue}: {payTokenValue: number}): ReturnType => {
  const { address } = useAccount()
  const ethBalance = useBalance({
    address,
  })
  const { writeContract, error, isPending } = useWriteContract()

  const WETHBalance = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: TOKEN_ADDRESS.WETH,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address!],
      },
      {
        address: TOKEN_ADDRESS.WETH,
        abi: erc20Abi,
        functionName: 'decimals',
      },
    ],
  })
  const ethAmount = formatBalance(ethBalance.data?.value, ethBalance.data?.decimals)
  const wethAmount = formatBalance(WETHBalance.data?.[0], WETHBalance.data?.[1])

  const balances = [ethAmount, wethAmount]

  const depositWeth = () => {
    writeContract({
      abi: ABI.WETH,
      address: TOKEN_ADDRESS.WETH,
      value: BigInt(payTokenValue * 10 ** ethBalance.data?.decimals!),
      functionName: 'deposit',
    })
  }

  const withdrawWeth = () => {
    writeContract({
      abi: ABI.WETH,
      address: TOKEN_ADDRESS.WETH,
      functionName: 'withdraw',
      args: [BigInt(payTokenValue * 10 ** WETHBalance.data?.[1]!)],
    })
  }

  const balanceError = ethBalance.error || WETHBalance.error
  const balanceIsFetching = ethBalance.isFetching || WETHBalance.isFetching

  return {balances, error, isPending, balanceError, balanceIsFetching, depositWeth, withdrawWeth}
}
