// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

const ManagementFundEditTokenStatementCard = () => {
  return (
    <Card>
      <CardHeader title='Statement' />
      <CardContent>
        <Stack spacing={4} justifyContent='column' alignItems='center'>
          <Stack spacing={2} alignSelf='stretch' justifyContent='center' alignItems='flex-start'>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              Metadata
            </Typography>

            <Stack direction='row' justifyContent='space-between' alignItems='center' alignSelf='stretch'>
              <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
                <CustomAvatar skin='light' color='success' variant='rounded' sx={{ mr: 3 }}>
                  <Image alt='credit-card' src='/images/cards/credit-card.png' width={22.5} height={18} />
                </CustomAvatar>
                <Stack spacing={0.5} justifyContent='center'>
                  <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
                    Contract Address
                  </Typography>
                  <Typography variant='caption'>0x4F2f...abc</Typography>
                </Stack>
              </Stack>
              <Stack justifyContent='center'>
                <Button size='small'>Copy</Button>
              </Stack>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' alignSelf='stretch'>
              <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
                <CustomAvatar skin='light' color='success' variant='rounded' sx={{ mr: 3 }}>
                  <Image alt='credit-card' src='/images/cards/credit-card.png' width={22.5} height={18} />
                </CustomAvatar>
                <Stack justifyContent='center'>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Total Supply
                  </Typography>
                  <Typography variant='caption'>4,000</Typography>
                </Stack>
              </Stack>
              <Stack justifyContent='center'>
                <Button size='small'>Copy</Button>
              </Stack>
            </Stack>
          </Stack>

          <Stack spacing={2} alignSelf='stretch' justifyContent='center' alignItems='flex-start'>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              Permission
            </Typography>

            <Stack direction='row' justifyContent='space-between' alignItems='center' alignSelf='stretch'>
              <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
                <CustomAvatar skin='light' color='success' variant='rounded' sx={{ mr: 3 }}>
                  <Image alt='credit-card' src='/images/cards/credit-card.png' width={22.5} height={18} />
                </CustomAvatar>
                <Stack spacing={0.5} justifyContent='center'>
                  <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
                    Admin
                  </Typography>
                  <Typography variant='caption'>0x4F2f...abc</Typography>
                </Stack>
              </Stack>
              <Stack justifyContent='center'>
                <Button size='small'>Copy</Button>
              </Stack>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' alignSelf='stretch'>
              <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
                <CustomAvatar skin='light' color='success' variant='rounded' sx={{ mr: 3 }}>
                  <Image alt='credit-card' src='/images/cards/credit-card.png' width={22.5} height={18} />
                </CustomAvatar>
                <Stack spacing={0.5} justifyContent='center'>
                  <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
                    Admin
                  </Typography>
                  <Typography variant='caption'>0x4F2f...abc</Typography>
                </Stack>
              </Stack>
              <Stack justifyContent='center'>
                <Button size='small'>Copy</Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button fullWidth variant='contained'>
          Setting
        </Button>
      </CardActions>
    </Card>
  )
}

export default ManagementFundEditTokenStatementCard
