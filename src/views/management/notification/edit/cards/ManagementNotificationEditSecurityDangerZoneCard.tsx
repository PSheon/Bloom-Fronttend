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
import { useDeleteOneMutation } from 'src/store/api/management/notification'

// ** Type Imports
import type { NotificationType } from 'src/types/notificationTypes'

interface Props {
  initNotificationEntity: NotificationType
}

const ManagementNotificationEditSecurityDangerZoneCard = (props: Props) => {
  // ** Props
  const { initNotificationEntity } = props

  // ** States
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

  // ** Hooks
  const router = useRouter()

  const [deleteOneNotification, { data: deletedOneNotification, isLoading: isDeleteOneNotificationLoading }] =
    useDeleteOneMutation()

  // ** Logics
  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true)
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false)

  const handleDeleteOneMediaAssetClick = async () => {
    await deleteOneNotification(initNotificationEntity.id)
  }

  // ** Side Effects
  if (deletedOneNotification) {
    router.push('/management/notification/list')
  }

  return (
    <Card>
      <CardHeader title='危險區域' />
      <CardContent>
        <Typography>請注意！檔案將永久刪除且無法重新找回</Typography>
      </CardContent>

      <CardActions>
        <Button variant='outlined' color='error' onClick={handleOpenDeleteDialog}>
          刪除通知
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
          確定要刪除通知？
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
            loading={isDeleteOneNotificationLoading}
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

export default ManagementNotificationEditSecurityDangerZoneCard
