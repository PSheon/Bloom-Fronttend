// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

// ** Utils Import
import { getRequestSheetTypeAttributes } from 'src/utils'

// ** Types
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const TitleCard = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  // ** Vars
  const { displayName } = getRequestSheetTypeAttributes(initRequestSheetEntity.type)

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            {initRequestSheetEntity.title}
          </Typography>
        }
        subheader={
          <Typography variant='subtitle2'>{`${displayName}${
            initRequestSheetEntity?.referenceCaseNumber ? ` 案號：${initRequestSheetEntity.referenceCaseNumber}` : ''
          }`}</Typography>
        }
      />
    </Card>
  )
}

export default TitleCard
