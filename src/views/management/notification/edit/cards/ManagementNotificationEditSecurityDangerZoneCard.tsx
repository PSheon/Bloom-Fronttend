// ** React Imports
import { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useDeleteOneMutation } from 'src/store/api/management/notification'

// ** Type Imports
import { NotificationType } from 'src/types/api/notificationTypes'

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

      <Dialog
        fullWidth
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}
      >
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              '& svg': { mb: 8, color: 'error.main' }
            }}
          >
            <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
            <Typography variant='h4' sx={{ mb: 5, color: 'text.secondary' }}>
              確定要刪除通知？
            </Typography>
            <Typography>此操作將無法回復!</Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'space-between',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' onClick={() => handleCloseDeleteDialog()}>
            取消
          </Button>
          <LoadingButton
            loading={isDeleteOneNotificationLoading}
            variant='outlined'
            color='secondary'
            onClick={handleDeleteOneMediaAssetClick}
          >
            確定，刪除
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default ManagementNotificationEditSecurityDangerZoneCard
