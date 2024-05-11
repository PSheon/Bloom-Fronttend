// ** React Imports
import { useState } from 'react'

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

// ** Third-Party Components
import { useSession } from 'next-auth/react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/user'

// ** Type Imports
import type { UserDataType } from 'src/types/api/authTypes'

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
            onClick={() => setSuspendDialogOpen(true)}
          >
            封鎖帳號
          </Button>
        )}
      </CardActions>

      <Dialog
        fullWidth
        open={suspendDialogOpen}
        onClose={handleClose}
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
              確定要暫停使用者？
            </Typography>
            <Typography>此操作將導致使用者無法進入系統!</Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'space-between',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' onClick={() => handleClose()}>
            取消
          </Button>
          <LoadingButton loading={isUpdateUserLoading} variant='outlined' color='secondary' onClick={handleBlockClick}>
            確定，封鎖使用者
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default ManagementUserEditDangerZoneCard
