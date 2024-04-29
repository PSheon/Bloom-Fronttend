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

const ManagementFundEditTokenPermissionCard = () => {
  return (
    <Card>
      <CardHeader title='Permissions' />
      <CardContent>
        <Stack spacing={4} justifyContent='column' alignItems='center'>
          <Stack direction='row' justifyContent='space-between' alignItems='center' alignSelf='stretch'>
            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
              <CustomAvatar skin='light' color='success' variant='rounded' sx={{ mr: 3 }}>
                <img alt='credit-card' src='/images/cards/credit-card.png' width={22.5} height={18} />
              </CustomAvatar>
              <Stack justifyContent='center'>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                  Admin
                </Typography>
                <Typography variant='caption'>0x4F2f...abc</Typography>
              </Stack>
            </Stack>
            <Stack justifyContent='center'>
              <Button variant='outlined' size='small' color='error'>
                Remove
              </Button>
            </Stack>
          </Stack>

          <Stack direction='row' justifyContent='space-between' alignItems='center' alignSelf='stretch'>
            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
              <CustomAvatar skin='light' color='success' variant='rounded' sx={{ mr: 3 }}>
                <img alt='credit-card' src='/images/cards/credit-card.png' width={22.5} height={18} />
              </CustomAvatar>
              <Stack justifyContent='center'>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                  Admin
                </Typography>
                <Typography variant='caption'>0x4F2f...abc</Typography>
              </Stack>
            </Stack>
            <Stack justifyContent='center'>
              <Button variant='outlined' size='small' color='error'>
                Remove
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button fullWidth variant='contained'>
          編輯
        </Button>
      </CardActions>
    </Card>
  )
}

export default ManagementFundEditTokenPermissionCard
