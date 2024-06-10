// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Third-Party Imports
import { useAccount } from 'wagmi'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import PortfolioOwnedSFTCard from 'src/views/portfolio/cards/me-positions/PortfolioOwnedSFTCard'
import PortfolioOwnedSFTSkeletonCard from 'src/views/portfolio/cards/me-positions/PortfolioOwnedSFTSkeletonCard'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/token'

const PortfolioPositionsOwnedSFTListGrid = () => {
  // ** Hooks
  const walletAccount = useAccount()

  const { data: ownedSFTData, isLoading: isOwnedSFTLoading } = useFindQuery(
    {
      filters: {
        owner: {
          $eqi: walletAccount.address as string
        }
      },
      pagination: {
        page: 1,
        pageSize: 25
      }
    },
    {
      skip: walletAccount.address === undefined
    }
  )

  // ** Vars
  const ownedSFT = ownedSFTData?.data || []

  return (
    <Grid container spacing={6} className='match-height'>
      {isOwnedSFTLoading ? (
        [...Array(3).keys()].map(index => (
          <Grid key={`portfolio-owned-skeleton-${index}`} item xs={12} sm={6} md={4}>
            <PortfolioOwnedSFTSkeletonCard />
          </Grid>
        ))
      ) : ownedSFT.length === 0 ? (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack spacing={4} alignItems='center' justifyContent='center'>
                <CustomAvatar skin='light' sx={{ width: 56, height: 56 }}>
                  <Icon icon='mdi:warning-circle-outline' fontSize='2rem' />
                </CustomAvatar>
                <Typography variant='h6' component='p'>
                  Do not have any SFT yet
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ) : (
        ownedSFT.map(sft => (
          <Grid key={`portfolio-owned-sft-${sft.id}`} item xs={12} sm={6} md={4}>
            <PortfolioOwnedSFTCard initTokenEntity={sft} />
          </Grid>
        ))
      )}
    </Grid>
  )
}

export default PortfolioPositionsOwnedSFTListGrid
