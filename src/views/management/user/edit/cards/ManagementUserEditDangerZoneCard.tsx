// ** React Imports
import { useState } from 'react'

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

// ** Third-Party Components
import { useSession } from 'next-auth/react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/user'

// ** Type Imports
import type { UserDataType } from 'src/types/authTypes'

interface Props {
  initUserEntity: UserDataType
}

const ManagementUserEditDangerZoneCard = (props: Props) => {
  // ** Props
  const { initUserEntity } = props

  // ** States
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)

  // ** Hooks
  const session = useSession()
  const [updateUser, { data: updatedUser = initUserEntity, isLoading: isUpdateUserLoading }] = useUpdateOneMutation()

  // ** Logics
  const handleOpen = () => setSuspendDialogOpen(true)
  const handleClose = () => setSuspendDialogOpen(false)

  const handleBlockClick = async () => {
    await updateUser({
      id: initUserEntity.id,
      data: {
        blocked: true
      }
    })
    handleClose()
  }

  const handleUnblockClick = async () => {
    await updateUser({
      id: initUserEntity.id,
      data: {
        blocked: false
      }
    })
    handleClose()
  }

  return (
    <Card>
      <CardHeader title='危險區域' />
      <CardContent>
        <Typography>帳號被封鎖後，使用者將無法進入系統後台，也無法查看任何資料</Typography>
      </CardContent>

      <CardActions>
        {updatedUser.blocked ? (
          <Button variant='contained' onClick={handleUnblockClick}>
            啟用帳號
          </Button>
        ) : (
          <Button
            color='error'
            variant='outlined'
            disabled={session.data!.user.id === initUserEntity.id}
            onClick={handleOpen}
          >
            封鎖帳號
          </Button>
        )}
      </CardActions>

      <Dialog fullWidth maxWidth='xs' open={suspendDialogOpen} onClose={handleClose}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          確定要暫停使用者？
          <DialogContentText variant='body2' component='p' sx={{ textAlign: 'center' }}>
            此操作將導致使用者無法進入系統
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
          <Button variant='contained' color='secondary' onClick={handleClose}>
            取消
          </Button>
          <LoadingButton
            loading={isUpdateUserLoading}
            variant='outlined'
            color='error'
            startIcon={<Icon icon='mdi:delete-outline' />}
            onClick={handleBlockClick}
          >
            確定
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default ManagementUserEditDangerZoneCard
