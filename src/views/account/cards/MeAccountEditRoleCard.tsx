// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { UserDataType } from 'src/context/types'

// ** Config Import
import { userRoleAttributes } from 'src/configs/acl'

interface Props {
  initMeUserEntity: UserDataType
}

const MeAccountEditRoleCard = (props: Props) => {
  // ** Props
  const { initMeUserEntity } = props

  return (
    <Card sx={{ boxShadow: 'none', border: theme => `2px solid ${theme.palette.primary.main}` }}>
      <CardContent>
        <Grid container spacing={2.7}>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>角色權限</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='h4'
              sx={{
                color: `${userRoleAttributes[initMeUserEntity.role!.name].color}.main`
              }}
            >
              {initMeUserEntity.role!.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', mb: 2.5, alignItems: 'center', '& svg': { mr: 2, color: 'text.secondary' } }}>
              <Icon icon='mdi:circle' fontSize='0.625rem' />
              <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                待加入權限說明
              </Typography>
            </Box>
            <Box
              sx={{
                mt: 2.5,
                display: 'flex',
                mb: 2.5,
                alignItems: 'center',
                '& svg': { mr: 2, color: 'text.secondary' }
              }}
            >
              <Icon icon='mdi:circle' fontSize='0.625rem' />
              <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                待加入權限說明
              </Typography>
            </Box>
            <Box
              sx={{
                mt: 2.5,
                display: 'flex',
                mb: 2.5,
                alignItems: 'center',
                '& svg': { mr: 2, color: 'text.secondary' }
              }}
            >
              <Icon icon='mdi:circle' fontSize='0.625rem' />
              <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                待加入權限說明
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default MeAccountEditRoleCard
