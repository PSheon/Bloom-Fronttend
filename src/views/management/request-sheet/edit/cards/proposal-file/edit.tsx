// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// ** Styled Component
import ProposalFileEditBox from 'src/views/management/request-sheet/edit/boxes/ProposalFileEditBox'

// ** Types
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const ProposalFileEditCard = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            上傳計畫書
          </Typography>
        }
        subheader={<Typography variant='subtitle2'>請將計畫書輸出成PDF</Typography>}
      />
      <CardContent>
        <ProposalFileEditBox initRequestSheetEntity={initRequestSheetEntity} />
      </CardContent>
    </Card>
  )
}

export default ProposalFileEditCard
