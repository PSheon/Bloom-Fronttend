// ** MUI Imports
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ManagementFundPreviewVaultNotPublishedCard = () => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={6} alignSelf='stretch' alignItems='center' justifyContent='center'>
          <Stack
            spacing={4}
            alignItems='center'
            justifyContent='center'
            sx={{ width: '100%', maxWidth: theme => theme.spacing(200), height: theme => theme.spacing(80) }}
          >
            <CustomAvatar skin='light' sx={{ width: 56, height: 56, mb: 2 }}>
              <Icon icon='mdi:settings-applications' fontSize='2rem' />
            </CustomAvatar>
            <Typography variant='h4' component='p' textAlign='center' sx={{ fontWeight: 600 }}>
              Fund vault not initialized
            </Typography>
            <Typography variant='subtitle1' component='p' textAlign='center'>
              {`Please set fund vault in the "vault" section.`}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ManagementFundPreviewVaultNotPublishedCard
