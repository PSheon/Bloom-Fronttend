// ** MUI Imports
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const PublicFundLiveVaultNotPublishedCard = () => {
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
              <Icon icon='mdi:magnify-scan' fontSize='2rem' />
            </CustomAvatar>
            <Typography variant='h4' component='p' textAlign='center' sx={{ fontWeight: 600 }}>
              Fund vault is under review
            </Typography>
            <Typography variant='subtitle1' component='p' textAlign='center'>
              {`This vault is under review and not published yet. Please check back later.`}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PublicFundLiveVaultNotPublishedCard
