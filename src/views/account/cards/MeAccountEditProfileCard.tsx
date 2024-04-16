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
import InputAdornment from '@mui/material/InputAdornment'
import DialogContentText from '@mui/material/DialogContentText'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Custom Component Imports
import MeAccountAvatarPreviewBox from 'src/views/account/boxes/MeAccountAvatarPreviewBox'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateMeOneMutation } from 'src/store/api/management/user'

// ** Type Imports
import { UserDataType } from 'src/context/types'

const schema = yup.object().shape({
  title: yup.string().nullable(),
  phone: yup.string().nullable()
})

interface Props {
  initMeUserEntity: UserDataType
}
interface FormData {
  title: string
  phone: string
}

const MeAccountEditProfileCard = (props: Props) => {
  // ** Props
  const { initMeUserEntity } = props

  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  // ** Hooks
  const [updateMeUser, { data: updatedMeUser = initMeUserEntity, isLoading: isUpdateMeUserLoading }] =
    useUpdateMeOneMutation()
  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      username: initMeUserEntity.username,
      email: initMeUserEntity.email,
      title: initMeUserEntity.title || '',
      phone: initMeUserEntity.phone || ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Logics
  const handleEditOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)
  const onSubmit = async (data: FormData) => {
    const { title, phone } = data

    await updateMeUser({
      data: {
        title,
        phone
      }
    })
    reset(undefined, { keepValues: true, keepDirty: false, keepDefaultValues: false })
    handleEditClose()
  }

  return (
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <MeAccountAvatarPreviewBox initMeUserEntity={updatedMeUser} />
        <Typography variant='h6' sx={{ mt: 4, mb: 2 }}>
          {initMeUserEntity.username}
        </Typography>
        <CustomChip
          skin='light'
          size='small'
          label={initMeUserEntity.blocked ? '已封鎖' : '啟用中'}
          color={initMeUserEntity.blocked ? 'error' : 'success'}
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

      <CardContent>
        <Typography variant='subtitle2'>個人資料</Typography>
        <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
        <Box sx={{ pt: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              姓名:
            </Typography>
            <Typography variant='body2'>{initMeUserEntity.username}</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              Email:
            </Typography>
            <Typography variant='body2'>{initMeUserEntity.email}</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              稱謂:
            </Typography>
            <Typography variant='body2'>{updatedMeUser.title || '未填寫'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              電話:
            </Typography>
            <Typography variant='body2'>{updatedMeUser.phone ? `(+886) ${updatedMeUser.phone}` : '未填寫'}</Typography>
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
        aria-labelledby='user-view-edit'
        aria-describedby='user-view-edit-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800 } }}
      >
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            id='user-view-edit'
            sx={{
              textAlign: 'center',
              fontSize: '1.5rem !important',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            編輯個人資料
          </DialogTitle>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
              更新個人資料詳細資訊將接受隱私審核
            </DialogContentText>

            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='姓名' value={updatedMeUser.username} inputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='信箱' value={updatedMeUser.email} inputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='稱謂'
                        placeholder='教授、經理'
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
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='phone'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='電話號碼'
                        placeholder='0988888888'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.phone)}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>台灣 (+886)</InputAdornment>
                        }}
                        sx={{ display: 'flex' }}
                      />
                    )}
                  />
                  {errors.phone && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>}
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
              loading={isUpdateMeUserLoading}
              disabled={!isDirty || Boolean(errors.title || errors.phone)}
              type='submit'
              variant='contained'
              endIcon={<Icon icon='mdi:content-save-outline' />}
            >
              更新
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </Card>
  )
}

export default MeAccountEditProfileCard
