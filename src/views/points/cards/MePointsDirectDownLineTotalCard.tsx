// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Type Imports
import type { Theme } from '@mui/material/styles'

const MePointsDirectDownLineTotalCard = () => {
  // ** Hooks
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Card sx={{ overflow: 'visible', position: 'relative' }}>
      <CardContent sx={{ pb: '0 !important' }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mb: 1.5, fontWeight: 600, whiteSpace: 'nowrap' }}>直推綁定</Typography>
            <CustomChip
              skin='light'
              size='small'
              label='Year of 2024'
              color='primary'
              sx={{ mb: 5.5, height: 20, fontWeight: 500, fontSize: '0.75rem' }}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant='h5' sx={{ mr: 1.5 }}>
                9,350
              </Typography>
              <Typography variant='caption' sx={{ color: 'success.main' }}>
                +15.6%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            {hidden ? null : <Image width={83} height={130} src='/images/cards/card-stats-img-1.png' alt='直推綁定' />}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default MePointsDirectDownLineTotalCard
