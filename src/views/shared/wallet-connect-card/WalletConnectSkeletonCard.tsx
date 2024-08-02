// ** MUI Imports
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'

const WalletConnectSkeletonCard = () => {
  return (
    <Card sx={{ backgroundColor: 'primary.main' }}>
      <CardContent>
        <Stack spacing={4} alignItems='flex-start' justifyContent='center'>
          <Stack direction='row' spacing={4} alignItems='center' justifyContent='center'>
            <Skeleton variant='circular' width={36} height={36} />
            <Stack alignItems='flex-start' justifyContent='center'>
              <Skeleton variant='text' width={200} />
              <Skeleton variant='text' width={80} />
            </Stack>
          </Stack>
          <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='center'>
            <Stack spacing={2} alignItems='center' justifyContent='center'>
              <Skeleton variant='text' width={200} />
              <Skeleton variant='text' width={120} />
            </Stack>
          </Stack>
          <Stack
            direction='row'
            spacing={4}
            alignSelf='stretch'
            alignItems='center'
            justifyContent='space-around'
            sx={{
              px: 6,
              py: 4,
              borderRadius: '10px',
              backgroundColor: theme => theme.palette.primary.dark
            }}
          >
            <Stack spacing={2} alignItems='center' justifyContent='center'>
              <Skeleton variant='circular' width={36} height={36} />
              <Skeleton variant='text' width={80} />
            </Stack>
            <Stack spacing={2} alignItems='center' justifyContent='center'>
              <Skeleton variant='circular' width={36} height={36} />
              <Skeleton variant='text' width={80} />
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default WalletConnectSkeletonCard
