// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getUserRoleAttributes } from 'src/utils'

// ** Type Imports
import type { RoleType } from 'src/types/api/roleAndPermissionTypes'

interface Props {
  roles: RoleType[]
  isRolesLoading: boolean
}

const SystemDashboardRolesList = (props: Props) => {
  // ** Props
  const { roles, isRolesLoading } = props

  return (
    <Grid container spacing={6} className='match-height'>
      {isRolesLoading
        ? [...Array(6).keys()].map(index => (
            <Grid key={`role-skeleton-${index}`} item xs={12} sm={6} lg={4}>
              <Skeleton variant='rounded' height={150} />
            </Grid>
          ))
        : roles.map(role => {
            const userRoleAttributes = getUserRoleAttributes(role.name)

            return (
              <Grid item xs={12} sm={6} lg={4} key={role.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='body2'>{`共 ${role.nb_users} 位成員`}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <Typography variant='h6'>{userRoleAttributes.displayName}</Typography>
                        <Typography variant='body2'>{userRoleAttributes.description}</Typography>
                      </Box>
                      <IconButton sx={{ color: `${userRoleAttributes.color}.main` }}>
                        <Icon icon={userRoleAttributes.icon} fontSize={20} />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
    </Grid>
  )
}

export default SystemDashboardRolesList
