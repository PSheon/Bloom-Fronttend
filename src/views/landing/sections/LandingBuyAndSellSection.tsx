// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

// ** Type Imports
import type { Theme } from '@mui/material/styles'
import type { BoxProps } from '@mui/material/Box'

const StyledRootBox = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: theme.spacing(120),
  paddingTop: theme.spacing(24),
  paddingBottom: theme.spacing(24),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    minHeight: theme.spacing(180)
  }
}))

const LandingBuyAndSellSection = () => {
  // ** Hooks
  const isDesktopView = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return (
    <StyledRootBox>
      <Stack spacing={6}>
        <Stack spacing={4} justifyContent='center' alignItems='center'>
          <Typography variant='h3' textAlign='center' sx={{ fontWeight: 900, maxWidth: theme => theme.spacing(180) }}>
            Buy and sell with the lowest fees in the industry
          </Typography>
          <Typography variant='subtitle1' textAlign='center' sx={{ maxWidth: theme => theme.spacing(160) }}>
            Buy and sell 150+ cryptocurrencies with 20+ fiat currencies using bank transfers or your credit/debit card.
          </Typography>
        </Stack>

        {isDesktopView && (
          <Stack spacing={4} justifyContent='center' alignItems='center'>
            <Image src='/images/landing/buy-and-sell/table.png' alt='table' width={1180} height={580} />
          </Stack>
        )}
      </Stack>
    </StyledRootBox>
  )
}

export default LandingBuyAndSellSection
