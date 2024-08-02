// ** React Imports
import { useState } from 'react'

// ** MUI Imports
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

// ** Third-Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSession } from 'next-auth/react'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Custom Component Imports
import MeAccountAvatarPreviewBox from 'src/views/account/boxes/MeAccountAvatarPreviewBox'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateMeOneMutation } from 'src/store/api/management/user'

// ** Type Imports
import type { UserDataType } from 'src/types/authTypes'

const schema = yup.object().shape({
  title: yup.string().optional(),
  phone: yup.string().optional()
})

interface Props {
  initMeUserEntity: UserDataType
}
interface FormData {
  title?: string
  phone?: string
}

const MeAccountEditProfileCard = (props: Props) => {
  // ** Props
  const { initMeUserEntity } = props

  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  // ** Hooks
  const session = useSession()

  const [updateMeUser, { data: updatedMeUser = initMeUserEntity, isLoading: isUpdateMeUserLoading }] =
    useUpdateMeOneMutation()

  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
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
    await session.update()
    reset(undefined, { keepValues: true, keepDirty: false, keepDefaultValues: false })
    handleEditClose()
  }

  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <MeAccountAvatarPreviewBox initMeUserEntity={updatedMeUser} />
        <Typography variant='h6' component='p' sx={{ mt: 4, mb: 2 }}>
          {initMeUserEntity.username}
        </Typography>
        <CustomChip
          skin='light'
          size='small'
          label={initMeUserEntity.blocked ? 'Blocked' : 'Activating'}
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

      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant='subtitle2' component='p'>
          Information
        </Typography>
        <Stack alignSelf='stretch'>
          <Divider />
        </Stack>
        <Stack spacing={2.7}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' component='p' color='text.primary'>
              Username:
            </Typography>
            <Typography variant='body2'>{initMeUserEntity.username}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' component='p' color='text.primary'>
              Email:
            </Typography>
            <Typography variant='body2'>{initMeUserEntity.email}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' component='p' color='text.primary'>
              Title:
            </Typography>
            <Typography variant='body2'>{updatedMeUser.title || 'Unfilled'}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' component='p' color='text.primary'>
              Phone:
            </Typography>
            <Typography variant='body2'>{updatedMeUser.phone ? `(+65) ${updatedMeUser.phone}` : 'Unfilled'}</Typography>
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
          Edit Profile
          <DialogContentText id='user-view-edit-description' variant='body2' component='p' sx={{ textAlign: 'center' }}>
            Updating personal information will undergo privacy review
          </DialogContentText>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`],
            pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`]
          }}
        >
          <form noValidate autoComplete='off'>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Username' value={updatedMeUser.username} inputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Email' value={updatedMeUser.email} inputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='Title'
                        placeholder='Doctor/Manager'
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
                        label='Phone Number'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.phone)}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>(+65)</InputAdornment>
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
            Cancel
          </Button>
          <LoadingButton
            loading={isUpdateMeUserLoading}
            disabled={!isDirty || Boolean(errors.title || errors.phone)}
            variant='contained'
            startIcon={<Icon icon='mdi:content-save-outline' />}
            onClick={handleSubmit(onSubmit)}
          >
            Update
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default MeAccountEditProfileCard
