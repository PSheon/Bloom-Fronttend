// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// ** Custom Component Imports
import ProposalFilePreviewBox from 'src/views/request-sheet/edit/boxes/ProposalFilePreviewBox'

// ** Type Imports
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const ProposalFileCard = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            計畫書
          </Typography>
        }
        subheader={<Typography variant='subtitle2'>請將計畫書輸出成PDF</Typography>}
      />
      <CardContent>
        <ProposalFilePreviewBox initRequestSheetEntity={initRequestSheetEntity} />
      </CardContent>
    </Card>
  )
}

export default ProposalFileCard
