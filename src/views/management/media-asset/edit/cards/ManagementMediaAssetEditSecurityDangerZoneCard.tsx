// ** React Imports
import { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useDeleteOneMutation } from 'src/store/api/management/mediaAsset'

// ** Type Imports
import type { MediaAssetType } from 'src/types/mediaAssetTypes'

interface Props {
  initMediaAssetEntity: MediaAssetType
}

const ManagementMediaAssetEditSecurityDangerZoneCard = (props: Props) => {
  // ** Props
  const { initMediaAssetEntity } = props

  // ** States
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

  // ** Hooks
  const router = useRouter()

  const [deleteOneMediaAssets, { data: deletedOneMediaAssets, isLoading: isDeleteOneMediaAssetsLoading }] =
    useDeleteOneMutation()

  // ** Logics
  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true)
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false)

  const handleDeleteOneMediaAssetClick = async () => {
    await deleteOneMediaAssets(initMediaAssetEntity.id)
  }

  // ** Side Effects
  if (deletedOneMediaAssets) {
    router.push('/management/media-asset/list')
  }

  return (
    <Card>
      <CardHeader title='危險區域' />
      <CardContent>
        <Typography>請注意！檔案將永久刪除且無法重新找回，請務必確認這份檔案沒有在使用中</Typography>
      </CardContent>

      <CardActions>
        <Button variant='outlined' color='error' onClick={handleOpenDeleteDialog}>
          刪除檔案
        </Button>
      </CardActions>

      <Dialog fullWidth maxWidth='xs' open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          刪除檔案
          <DialogContentText variant='body2' component='p' sx={{ textAlign: 'center' }}>
            此操作將無法復原
          </DialogContentText>
        </DialogTitle>
        <DialogActions
          sx={{
            justifyContent: 'space-between',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(4)} !important`],
            pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(7.5)} !important`]
          }}
        >
          <Button variant='contained' color='secondary' onClick={handleCloseDeleteDialog}>
            取消
          </Button>
          <LoadingButton
            loading={isDeleteOneMediaAssetsLoading}
            variant='outlined'
            color='error'
            startIcon={<Icon icon='mdi:delete-outline' />}
            onClick={handleDeleteOneMediaAssetClick}
          >
            確定
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default ManagementMediaAssetEditSecurityDangerZoneCard
