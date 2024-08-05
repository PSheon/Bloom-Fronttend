// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

// ** Layout Imports
import CommonLayout from 'src/layouts/CommonLayout'

// ** Type Imports
import type { ReactNode } from 'react'
import type { StackProps } from '@mui/material/Stack'

// ** Styled Components
const RootStack = styled(Stack)<StackProps>(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(5),
  textAlign: 'center'
}))

const StackWrapper = styled(Stack)<StackProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Error404Page = () => {
  // ** Hooks
  const theme = useTheme()

  return (
    <RootStack alignSelf='stretch' alignItems='center' justifyContent='center' sx={{ p: 5 }}>
      <StackWrapper spacing={6} alignItems='center' justifyContent='center'>
        <Typography variant='h1' sx={{ mb: 2.5 }}>
          404
        </Typography>

        <Stack spacing={2} alignItems='center' justifyContent='center'>
          <Typography
            variant='h5'
            component='h2'
            sx={{ mb: 2.5, letterSpacing: '0.18px', fontSize: '1.5rem !important' }}
          >
            {`Oops, you've lost in space`}
          </Typography>
          <Typography variant='body2'>{`We can't find the page that you're looking for`}</Typography>
        </Stack>

        <Button href='/' component={Link} variant='contained' size='large'>
          Back to Home
        </Button>
      </StackWrapper>

      <Box
        sx={{
          position: 'absolute',
          zIndex: -1,
          bottom: 0,
          left: 0,
          width: '100%',
          maxWidth: theme => theme.spacing(140),
          height: '100%',
          maxHeight: theme => theme.spacing(140),
          filter: 'drop-shadow(rgba(109, 120, 141, 0.1) 3px 5px 2px)',
          [theme.breakpoints.down('md')]: {
            maxWidth: theme => theme.spacing(75),
            maxHeight: theme => theme.spacing(75)
          }
        }}
      >
        <svg width='100%' height='100%' viewBox='0 0 654 658' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M521.608 576.571C394.461 304.632 66.4434 401.772 -77.2637 198.747C-155.931 87.6086 -282.482 -159.996 -645.274 153.577C-878.761 356.87 -751.153 623.606 -438.769 742.802C-356.584 786.27 -319.893 844.899 -296.91 923.083C-273.928 1001.27 -325.357 1171.64 -231.284 1328.08C51.8159 1798.86 997.77 1594.97 521.608 576.571Z'
            fill={theme.palette.primary.main}
          />
        </svg>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          zIndex: -1,
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: theme => theme.spacing(140),
          height: '100%',
          maxHeight: theme => theme.spacing(140),
          filter: 'drop-shadow(rgba(109, 120, 141, 0.1) 3px 5px 2px)',
          [theme.breakpoints.down('md')]: {
            maxWidth: theme => theme.spacing(75),
            maxHeight: theme => theme.spacing(75)
          }
        }}
      >
        <svg width='100%' height='100%' viewBox='0 0 669 966' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M1287.61 -9.42931C1160.46 -281.368 832.443 -184.228 688.736 -387.253C610.069 -498.391 483.518 -745.996 120.726 -432.423C-112.761 -229.13 14.8468 37.6062 327.231 156.802C409.416 200.27 446.107 258.899 469.089 337.083C492.072 415.267 440.643 585.643 534.716 742.082C817.816 1212.86 1763.77 1008.97 1287.61 -9.42931Z'
            fill={theme.palette.primary.main}
          />
        </svg>
      </Box>
    </RootStack>
  )
}

Error404Page.authGuard = false
Error404Page.contentHeightFixed = true
Error404Page.getLayout = (page: ReactNode) => (
  <CommonLayout showAppBar={false} showFooter={false}>
    {page}
  </CommonLayout>
)

export default Error404Page
