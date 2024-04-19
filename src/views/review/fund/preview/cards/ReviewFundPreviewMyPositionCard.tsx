// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ReviewFundPreviewMyPositionCard = (props: Props) => {
  // ** Props
  const {
    /* initFundEntity */
  } = props

  return (
    <Card>
      <CardHeader title='My Position' />
      <CardContent>TODO</CardContent>
    </Card>
  )
}

export default ReviewFundPreviewMyPositionCard
