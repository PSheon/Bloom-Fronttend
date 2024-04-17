// ** MUI Imports
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third-Party Imports
import { ApexOptions } from 'apexcharts'
import { format } from 'date-fns'

// ** Core Component Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Imports
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ReviewFundPreviewMyPositionCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <Card>
      <CardHeader title='My Position' />
      <CardContent>TODO</CardContent>
    </Card>
  )
}

export default ReviewFundPreviewMyPositionCard
