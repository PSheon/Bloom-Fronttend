// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import PublicFundDefiVaultMyDepositStatisticsStack from 'src/views/fund/defi-vault/stacks/PublicFundDefiVaultMyDepositStatisticsStack'
import PublicFundDefiVaultMyReferralInformationStack from 'src/views/fund/defi-vault/stacks/PublicFundDefiVaultMyReferralInformationStack'
import PublicFundDefiVaultMyDepositClaimCard from 'src/views/fund/defi-vault/cards/PublicFundDefiVaultMyDepositClaimCard'
import PublicFundDefiVaultMyReferralLinkCard from 'src/views/fund/defi-vault/cards/PublicFundDefiVaultMyReferralLinkCard'

// ** Type Imports
import type { DVFundType } from 'src/types/dvFundTypes'

interface Props {
  initDVFundEntity: DVFundType
}

const PublicFundDefiVaultDepositInformationGrid = (props: Props) => {
  // ** Props
  const { initDVFundEntity } = props

  return (
    <Grid container spacing={6} sx={{ pt: 6 }}>
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <PublicFundDefiVaultMyDepositStatisticsStack initDVFundEntity={initDVFundEntity} />
          </Grid>

          <Grid item xs={12}>
            <PublicFundDefiVaultMyDepositClaimCard />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <PublicFundDefiVaultMyReferralInformationStack />
          </Grid>

          <Grid item xs={12}>
            <PublicFundDefiVaultMyReferralLinkCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PublicFundDefiVaultDepositInformationGrid
