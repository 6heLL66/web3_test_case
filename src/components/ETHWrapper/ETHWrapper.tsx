import { Error } from '@mui/icons-material'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import { LoadingButton } from '@mui/lab'
import { Alert, Box, Button, CircularProgress } from '@mui/material'
import { useState } from 'react'

import { TOKENS, Token } from '../../shared/constants'
import { ErrorTypes, TokenInput } from '../../shared/TokenInput/TokenInput'
import { useWethWrapper } from './useWethWrapper'

export const ETHWrapper = () => {
  const [payToken, setPayToken] = useState<Token>(TOKENS.ETH)
  const [receiveToken, setReceiveToken] = useState<Token>(TOKENS.WETH)
  const [payTokenValue, setPayTokenValue] = useState(0)
  const [receiveTokenValue, setReceiveTokenValue] = useState(0)

  const [inputError, setInputError] = useState<ErrorTypes | null>(null)

  const { balances, depositWeth, withdrawWeth, error, isPending, balanceError, balanceIsFetching } = useWethWrapper({
    payTokenValue,
  })

  const handleSubmit = () => {
    if (!payTokenValue) {
      setInputError(ErrorTypes.Empty)
      return
    }
    if (payToken === 'ETH') {
      if (Number(balances[0]) < payTokenValue) {
        setInputError(ErrorTypes.NotEnoughBalance)
        return
      }
      depositWeth()
      return
    }

    if (Number(balances[1]) < payTokenValue) {
      setInputError(ErrorTypes.NotEnoughBalance)
      return
    }

    withdrawWeth()
  }

  const reverse = () => {
    setPayToken(receiveToken)
    setReceiveToken(payToken)
  }

  const handlePayTokenChange = (value: number) => {
    setInputError(null)
    setPayTokenValue(value)
    setReceiveTokenValue(value)
  }

  if (balanceIsFetching) {
    return <CircularProgress size={48} />
  }

  if (balanceError) {
    return (
      <Alert icon={<Error fontSize='inherit' />} severity='error'>
        {balanceError.name}
      </Alert>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        alignItems: 'center',
      }}
    >
      <TokenInput
        title='Pay with'
        token={payToken}
        value={payTokenValue}
        onChange={handlePayTokenChange}
        balance={balances[Number(payToken === 'WETH')]}
        error={inputError}
      />
      <Button variant='contained' size='small' onClick={reverse}>
        <SwapVertIcon fontSize='medium' />
      </Button>
      <TokenInput
        title='Receive'
        token={receiveToken}
        value={receiveTokenValue}
        balance={balances[Number(payToken === 'ETH')]}
        disabled
      />

      <LoadingButton variant='contained' loading={isPending} sx={{ width: '100%', mt: 1 }} onClick={handleSubmit}>
        Swap
      </LoadingButton>

      {error && (
        <Alert icon={<Error fontSize='inherit' />} severity='error'>
          {error.name}
        </Alert>
      )}
    </Box>
  )
}
