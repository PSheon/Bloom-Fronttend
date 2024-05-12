// ** MUI Imports
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

// ** Custom Component Imports
import LogoImage from 'src/views/shared/LogoImage'

// ** Type Imports
import type { BoxProps } from '@mui/material/Box'

interface Props {
  sx?: BoxProps['sx']
}

const FallbackSpinner = (props: Props) => {
  // ** Props
  const { sx } = props

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LogoImage width={80} height={80} />
        <CircularProgress
          disableShrink
          size={96}
          sx={{ mt: 6, position: 'absolute', top: -28, zIndex: 1, strokeLinecap: 'round' }}
        />
      </Box>
    </Box>
  )
}

export default FallbackSpinner
