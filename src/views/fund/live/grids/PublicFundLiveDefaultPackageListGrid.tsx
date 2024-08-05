// ** MUI Components
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import PublicFundLivePackageCard from 'src/views/fund/live/cards/PublicFundLivePackageCard'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const PublicFundLiveDefaultPackageListGrid = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** Vars
  const { defaultPackages: defaultPackagesData } = initFundEntity

  const publishedDefaultPackages = defaultPackagesData?.data
    ?.map(pkg => ({ id: pkg.id, ...pkg.attributes }))
    ?.filter(pkg => pkg.status === 'Published')

  // ** Renders
  if (!publishedDefaultPackages || publishedDefaultPackages?.length === 0) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <CustomAvatar skin='light' sx={{ width: 56, height: 56, mb: 2 }}>
                <Icon icon='mdi:exclamation-thick' fontSize='2rem' />
              </CustomAvatar>
              <Typography variant='h6' sx={{ mb: 2 }}>
                Attention
              </Typography>
              <Typography variant='body2'>Package not yet set</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={6}>
      {publishedDefaultPackages.map(defaultPackage => {
        return (
          <Grid key={`default-package-${defaultPackage.id}`} item xs={12}>
            <PublicFundLivePackageCard initFundEntity={initFundEntity} initPackageEntity={defaultPackage} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default PublicFundLiveDefaultPackageListGrid
