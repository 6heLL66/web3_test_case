import { Box } from '@mui/material'
import { useAccount } from 'wagmi'

import { ETHWrapper } from './components/ETHWrapper/ETHWrapper'

function App() {
  const { isConnected } = useAccount()

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <w3m-button />
      <Box sx={{ mt: 2 }}>{isConnected && <ETHWrapper />}</Box>
    </Box>
  )
}

export default App
