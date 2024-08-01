import { Box, InputAdornment, TextField, Typography } from '@mui/material'

import { TOKEN_ICONS, Token } from '../constants'

export enum ErrorTypes {
  Empty,
  NotEnoughBalance,
}

type Props = {
  balance?: string
  title: string
  token: Token
  value: number
  onChange?: (v: number) => void
  disabled?: boolean
  error?: ErrorTypes | null
}

export const TokenInput = ({ title, token, value, onChange, disabled, balance, error }: Props) => {
  return (
    <Box
      sx={{
        background: '#e3f2fd',
        borderRadius: 2,
        border: '1px solid #4fc3f7',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography color='black' fontWeight={700}>
        {title}
      </Typography>
      <TextField
        label={token}
        value={value || ''}
        error={error === ErrorTypes.Empty}
        placeholder='0'
        onChange={e => onChange?.(+e.target.value.replace(/-/, ''))}
        InputProps={{
          startAdornment: <InputAdornment position='start'>{TOKEN_ICONS[token]}</InputAdornment>,
          inputProps: { min: 0 },
        }}
        type='number'
        variant='standard'
        disabled={disabled}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography color={error === ErrorTypes.NotEnoughBalance ? 'red' : 'GrayText'} fontSize='10px'>
          Balance: {balance ?? '0'}
        </Typography>
        <Typography color='GrayText' fontSize='10px'>
          {}
        </Typography>
      </Box>
    </Box>
  )
}
