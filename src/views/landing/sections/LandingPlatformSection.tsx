// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

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

const LandingPlatformSection = () => {
  return (
    <StyledRootBox>
      <Stack spacing={4} alignItems='center'>
        <Typography variant='h3' textAlign='center' sx={{ fontWeight: 900, maxWidth: theme => theme.spacing(200) }}>
          A crypto investment platform that invests in you
        </Typography>
        <Typography variant='body1' textAlign='center' sx={{ maxWidth: theme => theme.spacing(140) }}>
          We invest more resources than any other platform in making sure great support from real people is a click
          away, whenever you need it.
        </Typography>
      </Stack>
    </StyledRootBox>
  )
}

export default LandingPlatformSection
