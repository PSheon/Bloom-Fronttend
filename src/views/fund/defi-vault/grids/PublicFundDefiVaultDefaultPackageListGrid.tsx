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
import PublicFundDefiVaultPackageCard from 'src/views/fund/defi-vault/cards/PublicFundDefiVaultPackageCard'

// ** Type Imports
import type { DVFundType } from 'src/types/dvFundTypes'

interface Props {
  initDVFundEntity: DVFundType
}

const PublicFundDefiVaultDefaultPackageListGrid = (props: Props) => {
  // ** Props
  const { initDVFundEntity } = props

  // ** Vars
  const { defaultPackages: defaultPackagesData } = initDVFundEntity

  const publishedDefaultPackages = defaultPackagesData?.data
    ?.map(pkg => ({ id: pkg.id, ...pkg.attributes }))
    ?.filter(pkg => {
      const hasAPY = pkg.slots?.find(slot => slot.propertyName === 'APY')
      const hasDuration = pkg.slots?.find(slot => slot.propertyName === 'Duration')
      const hasPrincipalDelayDays = pkg.slots?.find(slot => slot.propertyName === 'PrincipalDelayDays')
      return pkg.status === 'Published' && hasAPY && hasDuration && hasPrincipalDelayDays
    })

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
            <PublicFundDefiVaultPackageCard initDVFundEntity={initDVFundEntity} initPackageEntity={defaultPackage} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default PublicFundDefiVaultDefaultPackageListGrid
