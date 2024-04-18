// ** MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third-Party Imports
import toast from 'react-hot-toast'
import copyToClipboard from 'clipboard-copy'

// ** Util Imports
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import { MediaAssetType } from 'src/types/api/mediaAssetTypes'

interface Props {
  initMediaAssetEntity: MediaAssetType
}

const ManagementMediaAssetEditShareCard = (props: Props) => {
  // ** Props
  const { initMediaAssetEntity } = props

  // ** Logics
  const handleCopyUrlClick = () => {
    copyToClipboard(getPublicMediaAssetUrl(initMediaAssetEntity.url))
    toast.success('已複製檔案連結')
  }

  return (
    <Card>
      <CardHeader title='共享' />
      <CardContent>
        <Typography>任何知道連結的人都可以檢視檔案</Typography>
      </CardContent>
      <CardActions>
        <Button color='primary' variant='outlined' onClick={handleCopyUrlClick}>
          複製檔案連結
        </Button>
      </CardActions>
    </Card>
  )
}

export default ManagementMediaAssetEditShareCard
