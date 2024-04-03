// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Config Import
import { userRoleAttributes } from 'src/configs/acl'

// ** Types
import { RoleType } from 'src/types/api/roleAndPermissionTypes'

interface Props {
  roles: RoleType[]
}

const RolesList = (props: Props) => {
  // ** Props
  const { roles } = props

  return (
    <Grid container spacing={6} className='match-height'>
      {roles.map(role => (
        <Grid item xs={12} sm={6} lg={4} key={role.id}>
          <Card>
            <CardContent>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='body2'>{`Total ${role.nb_users} users`}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography variant='h6'>{role.name}</Typography>
                  <Typography variant='body2'>{role.description}</Typography>
                </Box>
                <IconButton sx={{ color: `${userRoleAttributes[role.name].color}.main` }}>
                  <Icon icon={userRoleAttributes[role.name].icon} fontSize={20} />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default RolesList
