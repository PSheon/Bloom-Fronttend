// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import ManagementNotificationEditNotifierAvatarPreviewBox from 'src/views/management/notification/edit/boxes/ManagementNotificationEditNotifierAvatarPreviewBox'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/notification'

// ** Type Imports
import { NotificationType } from 'src/types/api/notificationTypes'

const schema = yup.object().shape({
  title: yup.string().required()
})

interface Props {
  initNotificationEntity: NotificationType
}
interface FormData {
  title: string
}

const ManagementNotificationEditProfileCard = (props: Props) => {
  // ** Props
  const { initNotificationEntity } = props

  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  // ** Hooks
  const [
    updateNotification,
    { data: updatedNotification = initNotificationEntity, isLoading: isUpdateNotificationLoading }
  ] = useUpdateOneMutation()
  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      title: initNotificationEntity.title
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Logics
  const handleEditOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)
  const onSubmit = async (data: FormData) => {
    const { title } = data

    await updateNotification({
      id: initNotificationEntity.id,
      data: {
        title
      }
    })
    reset(undefined, { keepValues: true, keepDirty: false, keepDefaultValues: false })
    handleEditClose()
  }

  return (
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <ManagementNotificationEditNotifierAvatarPreviewBox initNotificationEntity={initNotificationEntity} />
        <Typography variant='h6' sx={{ mt: 4, mb: 2 }}>
          {initNotificationEntity.title}
        </Typography>
        <CustomChip
          skin='light'
          size='small'
          label={initNotificationEntity.isSeen ? '已讀' : '未讀'}
          color={initNotificationEntity.isSeen ? 'success' : 'warning'}
          sx={{
            height: 20,
            fontWeight: 600,
            borderRadius: '5px',
            fontSize: '0.875rem',
            textTransform: 'capitalize',
            '& .MuiChip-label': { mt: -0.25 }
          }}
        />
      </CardContent>

      <CardContent sx={{ my: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
              <Icon icon='mdi:storage' />
            </CustomAvatar>
            <Box>
              <Typography variant='subtitle1' sx={{ lineHeight: 1.3 }}>
                {initNotificationEntity.catalog}
              </Typography>
              <Typography variant='body2'>Trigger</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
              <Icon icon='mdi:list-status' />
            </CustomAvatar>
            <Box>
              <Typography variant='subtitle1' sx={{ lineHeight: 1.3 }}>
                Succeed
              </Typography>
              <Typography variant='body2'>Status</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>

      <CardContent>
        <Typography variant='subtitle2'>檔案資料</Typography>
        <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
        <Box sx={{ pt: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary', whiteSpace: 'nowrap' }}>
              名稱:
            </Typography>
            <Typography variant='body2' noWrap>
              {updatedNotification.title}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button fullWidth variant='contained' onClick={handleEditOpen}>
          編輯
        </Button>
      </CardActions>

      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby='notification-view-edit'
        aria-describedby='notification-view-edit-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800 } }}
      >
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            id='notification-view-edit'
            sx={{
              textAlign: 'center',
              fontSize: '1.5rem !important',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            編輯通知
          </DialogTitle>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <DialogContentText
              variant='body2'
              id='notification-view-edit-description'
              sx={{ textAlign: 'center', mb: 7 }}
            >
              更新文件詳細資訊將接受隱私審核
            </DialogContentText>

            <Grid container spacing={6}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='通知名稱'
                        placeholder='通知'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.title)}
                      />
                    )}
                  />
                  {errors.title && <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'space-between',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button variant='outlined' color='secondary' onClick={handleEditClose}>
              取消
            </Button>
            <LoadingButton
              loading={isUpdateNotificationLoading}
              disabled={!isDirty || Boolean(errors.title)}
              type='submit'
              variant='contained'
              endIcon={<Icon icon='mdi:content-save-outline' />}
            >
              儲存
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </Card>
  )
}

export default ManagementNotificationEditProfileCard
