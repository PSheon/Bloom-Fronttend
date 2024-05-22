// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const PublicFundLiveOwnedSFTSkeletonCard = () => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={4} alignItems='center' justifyContent='center' sx={{ position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: 0, right: 8 }}>
            <Skeleton variant='rounded' width={48} height={24} />
          </Box>
          <Box
            sx={{
              minHeight: theme => theme.spacing(64),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Skeleton variant='rounded' width={180} height={200} />
          </Box>
        </Stack>
        <Stack spacing={4} alignSelf='stretch'>
          <Stack direction='row' spacing={2} flexWrap='wrap' justifyContent='space-between'>
            <Skeleton width={150} />
            <Skeleton variant='text' width={45} />
          </Stack>
        </Stack>

        <Box sx={{ mt: 4 }}>
          <Typography variant='body2'>
            <Skeleton />
          </Typography>
          <Typography variant='body2'>
            <Skeleton />
          </Typography>
        </Box>
        <Box>
          <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
        </Box>
        <Stack spacing={2} justifyContent='center'>
          <Skeleton variant='text' width={40} />

          <Stack spacing={2} alignSelf='stretch'>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Skeleton variant='text' width={160} />
              <Skeleton variant='text' width={100} />
            </Stack>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Skeleton variant='text' width={160} />
              <Skeleton variant='text' width={100} />
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={{ mt: 'auto' }}>
          <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
          <Button
            fullWidth
            disabled
            variant='contained'
            size='small'
            sx={{
              '& svg': {
                transition: theme => theme.transitions.create('transform')
              }
            }}
            startIcon={<Icon icon='mdi:keyboard-arrow-down' />}
          >
            Stake
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PublicFundLiveOwnedSFTSkeletonCard
