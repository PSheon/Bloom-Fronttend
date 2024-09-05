// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Core Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Custom Component Imports
import PublicFundDefiVaultPackageDepositRevenueChart from 'src/views/fund/defi-vault/charts/PublicFundDefiVaultPackageDepositRevenueChart'

/* TODO: Fix here later */
const PublicFundDefiVaultMyDepositClaimCard = () => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={6}>
          <Stack>
            <Typography variant='subtitle1' component='p'>
              My Deposit Information
            </Typography>
          </Stack>

          <Stack alignSelf='stretch'>
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <Stack spacing={4}>
                  <Typography>Deposit back</Typography>

                  <Stack spacing={4}>
                    <Stack direction='row' spacing={2} alignItems='flex-end' justifyContent='center'>
                      <Typography variant='h4' component='p'>
                        $59.99
                      </Typography>
                      <Typography component='sub' color='text.secondary'>
                        USDT
                      </Typography>
                    </Stack>
                    <Button size='medium' variant='contained'>
                      Claim
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={5}>
                <Stack spacing={4}>
                  <Typography>Referral reward</Typography>

                  <Stack spacing={4}>
                    <Stack direction='row' spacing={2} alignItems='flex-end' justifyContent='center'>
                      <Typography variant='h4' component='p'>
                        $59.99
                      </Typography>
                      <Typography component='sub' color='text.secondary'>
                        USDT
                      </Typography>
                    </Stack>
                    <Button size='medium' variant='contained'>
                      Claim
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Stack>

          <Stack spacing={2}>
            <Stack alignSelf='stretch' sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
              <ApexChartWrapper>
                <PublicFundDefiVaultPackageDepositRevenueChart
                  startDate={new Date()}
                  amount={2000}
                  interestRate={24}
                  duration={730}
                  principalDelayInDays={372}
                />
              </ApexChartWrapper>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PublicFundDefiVaultMyDepositClaimCard
