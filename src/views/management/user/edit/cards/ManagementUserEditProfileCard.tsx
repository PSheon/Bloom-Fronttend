// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { styled, darken } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
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
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third-Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/user'

// ** Util Imports
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import type { BoxProps } from '@mui/material/Box'
import type { UserDataType } from 'src/types/authTypes'

// ** Styled Preview Box Component
const RootPreviewBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  position: 'relative',
  padding: theme.spacing(2),
  height: theme.spacing(64),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  background: darken(theme.palette.background.paper, 0.1),
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: 10
  }
}))

const ProfilePicture = styled('img')(({ theme }) => ({
  margin: theme.spacing(4),
  width: '100%',
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.background.paper}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const schema = yup.object().shape({
  title: yup.string().optional(),
  phone: yup.string().optional()
})

interface Props {
  initUserEntity: UserDataType
}
interface FormData {
  title?: string
  phone?: string
}

const ManagementUserEditProfileCard = (props: Props) => {
  // ** Props
  const { initUserEntity } = props

  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  // ** Hooks
  const [updateUser, { data: updatedUser = initUserEntity, isLoading: isUpdateUserLoading }] = useUpdateOneMutation()

  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      title: initUserEntity.title || '',
      phone: initUserEntity.phone || ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Logics
  const handleEditOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  const onSubmit = async (data: FormData) => {
    const { title, phone } = data

    await updateUser({
      id: initUserEntity.id,
      data: { title, phone }
    })
    reset(undefined, { keepValues: true, keepDirty: false, keepDefaultValues: false })
    handleEditClose()
  }

  return (
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <RootPreviewBox>
          {initUserEntity?.avatar ? (
            <CustomAvatar
              src={getPublicMediaAssetUrl(initUserEntity.avatar.url)}
              variant='rounded'
              alt={initUserEntity.username}
              sx={{ width: 128, height: 128, fontWeight: 600, mb: 4 }}
            />
          ) : (
            <Box
              sx={{
                width: 128,
                height: 128,
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ProfilePicture src='/images/avatars/1.png' alt={initUserEntity.username} />
            </Box>
          )}
        </RootPreviewBox>
        <Typography variant='h6' sx={{ mt: 4, mb: 2 }}>
          {initUserEntity.username}
        </Typography>
        <CustomChip
          skin='light'
          size='small'
          label={initUserEntity.blocked ? 'Blocked' : 'Activating'}
          color={initUserEntity.blocked ? 'error' : 'success'}
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
              <Icon icon='mdi:poll' />
            </CustomAvatar>
            <Box>
              <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                1,000
              </Typography>
              <Typography variant='body2'>申請中</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' variant='rounded' color='info' sx={{ mr: 3 }}>
              <Icon icon='mdi:check' />
            </CustomAvatar>
            <Box>
              <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                1,000
              </Typography>
              <Typography variant='body2'>已完成</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>

      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant='subtitle2'>Information</Typography>
        <Stack alignSelf='stretch'>
          <Divider />
        </Stack>
        <Stack spacing={2.7}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' color='text.primary'>
              Username:
            </Typography>
            <Typography variant='body2'>{initUserEntity.username}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' color='text.primary'>
              Email:
            </Typography>
            <Typography variant='body2'>{initUserEntity.email}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' color='text.primary'>
              Title:
            </Typography>
            <Typography variant='body2'>{updatedUser.title || 'Unfilled'}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' color='text.primary'>
              Phone:
            </Typography>
            <Typography variant='body2'>{updatedUser.phone ? `(+886) ${updatedUser.phone}` : 'Unfilled'}</Typography>
          </Stack>
        </Stack>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button fullWidth variant='contained' onClick={handleEditOpen}>
          Edit
        </Button>
      </CardActions>

      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby='user-view-edit'
        aria-describedby='user-view-edit-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800, position: 'relative' } }}
      >
        <IconButton size='small' onClick={handleEditClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>

        <DialogTitle
          id='user-view-edit'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          編輯使用者
          <DialogContentText id='user-view-edit-description' variant='body2' component='p' sx={{ textAlign: 'center' }}>
            更新用戶詳細資訊將接受隱私審核
          </DialogContentText>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`],
            pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`]
          }}
        >
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='姓名' value={updatedUser.username} inputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='信箱' value={updatedUser.email} inputProps={{ readOnly: true }} />
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
          </form>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'space-between',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(4)} !important`],
            pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(7.5)} !important`]
          }}
        >
          <Button variant='outlined' color='secondary' onClick={handleEditClose}>
            取消
          </Button>
          <LoadingButton
            loading={isUpdateUserLoading}
            disabled={!isDirty || Boolean(errors.title || errors.phone)}
            variant='contained'
            startIcon={<Icon icon='mdi:content-save-outline' />}
            onClick={handleSubmit(onSubmit)}
          >
            儲存
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default ManagementUserEditProfileCard
