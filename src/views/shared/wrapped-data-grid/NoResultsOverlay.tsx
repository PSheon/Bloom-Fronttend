// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { BoxProps } from '@mui/material/Box'

const StyledGridOverlay = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
}))

const NoResultsOverlay = () => {
  return (
    <StyledGridOverlay>
      <Icon icon='mdi:magnify-remove-outline' width={120} height={120} />
      <Box sx={{ mt: 1 }}>No Results</Box>
    </StyledGridOverlay>
  )
}

export default NoResultsOverlay
