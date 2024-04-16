// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Core Component Imports
import PlanDetails from 'src/@core/components/plan-details'

// ** Type Imports
import { PricingPlanType } from 'src/@core/components/plan-details/types'

interface Props {
  plan: string
  data: PricingPlanType[] | null
}

const PricingPlans = (props: Props) => {
  // ** Props
  const { plan, data } = props

  return (
    <Grid container spacing={6}>
      {data?.map((item: PricingPlanType) => (
        <Grid item xs={12} md={4} key={item.title.toLowerCase()}>
          <PlanDetails plan={plan} data={item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default PricingPlans
