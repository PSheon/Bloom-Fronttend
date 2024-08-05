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

const NotificationReadSecurityDangerZoneCard = (props: Props) => {
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
    router.push('/notification/list')
  }

  return (
    <Card>
      <CardHeader title='Danger Zone' />
      <CardContent>
        <Typography>Please note! The file will be permanently deleted and cannot be retrieved</Typography>
      </CardContent>

      <CardActions>
        <Button variant='outlined' color='error' onClick={handleOpenDeleteDialog}>
          Delete Notification
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
          Are you sure you want to delete the notification?
          <DialogContentText id='user-view-edit-description' variant='body2' component='p' sx={{ textAlign: 'center' }}>
            {`It can't be undone`}
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
          <Button variant='contained' color='primary' onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <LoadingButton
            loading={isDeleteOneNotificationLoading}
            variant='outlined'
            color='error'
            startIcon={<Icon icon='mdi:delete-outline' />}
            onClick={handleDeleteOneMediaAssetClick}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default NotificationReadSecurityDangerZoneCard
