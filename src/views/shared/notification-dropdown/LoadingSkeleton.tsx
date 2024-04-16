// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Skeleton from '@mui/material/Skeleton'

// ** Styled MenuItem Component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const LoadingSkeleton = () => {
  // ** Renders
  const renderMenuItemLoadingSkeleton = () => {
    return (
      <MenuItem>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Skeleton variant='circular' width={40} height={40} />
          </Box>
          <Box
            sx={{
              pl: 4,
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Skeleton width='100%' sx={{ fontSize: '1.25rem' }} />
            <Skeleton width='100%' sx={{ fontSize: '1rem' }} />
          </Box>
        </Box>
      </MenuItem>
    )
  }

  return <Fragment>{[...Array(3).keys()].map(() => renderMenuItemLoadingSkeleton())}</Fragment>
}

export default LoadingSkeleton
