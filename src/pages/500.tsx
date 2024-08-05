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

const Error500Page = () => {
  // ** Hooks
  const theme = useTheme()

  return (
    <RootStack alignSelf='stretch' alignItems='center' justifyContent='center' sx={{ p: 5 }}>
      <StackWrapper spacing={6} alignItems='center' justifyContent='center'>
        <Typography variant='h1' sx={{ mb: 2.5 }}>
          500
        </Typography>

        <Stack spacing={2} alignItems='center' justifyContent='center'>
          <Typography
            variant='h5'
            component='h2'
            sx={{ mb: 2.5, letterSpacing: '0.18px', fontSize: '1.5rem !important' }}
          >
            Internal Server Error
          </Typography>
          <Typography variant='body2'>Oops, something went wrong!</Typography>
        </Stack>

        <Button href='/' component={Link} variant='contained' size='large'>
          Back to Home
        </Button>
      </StackWrapper>

      <Box
        sx={{
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          width: '100%',
          maxWidth: theme => theme.spacing(140),
          height: '100%',
          maxHeight: theme => theme.spacing(140),
          marginTop: '0 !important',
          filter: 'drop-shadow(rgba(109, 120, 141, 0.1) 3px 5px 2px)',
          [theme.breakpoints.down('md')]: {
            maxWidth: theme => theme.spacing(75),
            maxHeight: theme => theme.spacing(75)
          }
        }}
      >
        <svg width='100%' height='100%' viewBox='0 0 604 475' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M-22.9791 466.874C200.042 443.194 211.197 187.856 389.565 135.718C487.206 107.176 692.892 77.9996 559.616 -254.54C472.794 -468.918 253.336 -443.647 93.1627 -251.967C42.4688 -204.483 -7.87033 -192.823 -68.689 -195.603C-129.508 -198.383 -237.353 -276.149 -370.742 -247.741C-772.151 -162.255 -858.18 555.558 -22.9791 466.874Z'
            fill={theme.palette.primary.main}
          />
        </svg>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          zIndex: -1,
          bottom: 0,
          right: 0,
          width: '100%',
          maxWidth: theme => theme.spacing(140),
          height: '100%',
          maxHeight: theme => theme.spacing(140),
          marginTop: '0 !important',
          filter: 'drop-shadow(rgba(109, 120, 141, 0.1) 3px 5px 2px)',
          [theme.breakpoints.down('md')]: {
            maxWidth: theme => theme.spacing(75),
            maxHeight: theme => theme.spacing(75)
          }
        }}
      >
        <svg width='100%' height='100%' viewBox='0 0 495 726' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M722.774 948.976C932.618 869.827 879.03 619.927 1038.49 524.499C1125.78 472.259 1317.46 392.162 1104.64 103.972C966.571 -81.5868 760.576 -1.79651 653.909 224.077C616.827 282.81 571.054 306.785 511.499 319.431C451.945 332.076 327.975 284.016 206.059 345.138C-160.825 529.077 -63.0797 1245.39 722.774 948.976Z'
            fill={theme.palette.primary.main}
          />
        </svg>
      </Box>
    </RootStack>
  )
}

Error500Page.authGuard = false
Error500Page.contentHeightFixed = true
Error500Page.getLayout = (page: ReactNode) => (
  <CommonLayout showAppBar={false} showFooter={false}>
    {page}
  </CommonLayout>
)

export default Error500Page
