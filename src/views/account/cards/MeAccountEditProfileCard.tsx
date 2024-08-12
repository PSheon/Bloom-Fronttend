// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Autocomplete from '@mui/material/Autocomplete'
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
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
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

// ** Config Imports
import { countries } from 'src/configs/kyc'

// ** Type Imports
import type { SyntheticEvent } from 'react'
import type { UserDataType } from 'src/types/authTypes'
import type { CountryType } from 'src/configs/kyc'

const schema = yup.object().shape({
  fullName: yup.string().optional(),
  nationality: yup.string().optional(),
  phoneNumber: yup.string().optional(),
  idType: yup.string().oneOf(['Passport', 'ID Card', 'Permanent Resident Card', 'Driving License']).optional(),
  idNumber: yup.string().optional(),
  contactAddress: yup.string().optional()
})

interface Props {
  initMeUserEntity: UserDataType
}
interface FormData {
  fullName?: string
  nationality?: string
  phoneNumber?: string
  idType?: 'Passport' | 'ID Card' | 'Permanent Resident Card' | 'Driving License'
  idNumber?: string
  contactAddress?: string
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
      fullName: initMeUserEntity.fullName || '',
      nationality: initMeUserEntity.nationality || '',
      phoneNumber: initMeUserEntity.phoneNumber || '',
      idType: initMeUserEntity.idType,
      idNumber: initMeUserEntity.idNumber || '',
      contactAddress: initMeUserEntity.contactAddress || ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Logics
  const handleEditOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  const onSubmit = async (data: FormData) => {
    const { fullName, nationality, phoneNumber, idType, idNumber, contactAddress } = data

    await updateMeUser({
      data: {
        fullName,
        nationality,
        phoneNumber,
        idType,
        idNumber,
        contactAddress
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
              Full Name:
            </Typography>
            <Typography variant='body2'>{updatedMeUser.fullName || 'Unfilled'}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' component='p' color='text.primary'>
              Nationality:
            </Typography>
            <Typography variant='body2'>{updatedMeUser.nationality || 'Unfilled'}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' component='p' color='text.primary'>
              Phone Number:
            </Typography>
            <Typography variant='body2'>{updatedMeUser.phoneNumber || 'Unfilled'}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' component='p' color='text.primary'>
              ID:
            </Typography>
            <Typography variant='body2'>
              {updatedMeUser.idNumber
                ? `${updatedMeUser.idType ? `(${updatedMeUser.idType}) ` : ''}${updatedMeUser.idNumber}`
                : 'Unfilled'}
            </Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' component='p' color='text.primary'>
              Contact Address:
            </Typography>
            <Typography variant='body2'>{updatedMeUser.contactAddress || 'Unfilled'}</Typography>
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
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='subtitle2'>KYC Information</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='fullName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='Full Name'
                        placeholder='Your legal name'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.fullName)}
                      />
                    )}
                  />
                  {errors.fullName && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.fullName.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='nationality'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Autocomplete
                        autoHighlight
                        id='autocomplete-country-select'
                        defaultValue={countries.find(country => country.label === value)}
                        onChange={(event: SyntheticEvent, newCountry: CountryType | null) => {
                          onChange(newCountry?.label)
                        }}
                        options={countries as CountryType[]}
                        getOptionLabel={option => option.label || ''}
                        renderOption={(props, option) => (
                          <Box
                            key={`countries-${option.code}`}
                            component='li'
                            sx={{ '& > img': { mr: 4, flexShrink: 0 } }}
                            {...props}
                          >
                            <img
                              alt=''
                              width='20'
                              loading='lazy'
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            />
                            {option.label} ({option.code}) +{option.phone}
                          </Box>
                        )}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label='Choose a country'
                            inputProps={{
                              ...params.inputProps,
                              autocomplete: 'new-password'
                            }}
                          />
                        )}
                      />
                    )}
                  />
                  {errors.nationality && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.nationality.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='phoneNumber'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='Phone Number'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.phoneNumber)}
                      />
                    )}
                  />
                  {errors.phoneNumber && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.phoneNumber.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth>
                  <InputLabel id='me-account-edit-profile-id-type'>ID Type</InputLabel>
                  <Controller
                    name='idType'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        fullWidth
                        labelId='me-account-edit-profile-id-type'
                        label='ID Type'
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.idType)}
                      >
                        <MenuItem value='Passport'>Passport</MenuItem>
                        <MenuItem value='ID Card'>ID Card</MenuItem>
                        <MenuItem value='Permanent Resident Card'>Permanent Resident Card</MenuItem>
                        <MenuItem value='Driving License'>Driving License</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.idType && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.idType.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={7}>
                <FormControl fullWidth>
                  <Controller
                    name='idNumber'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='ID Number'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.idNumber)}
                      />
                    )}
                  />
                  {errors.idNumber && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.idNumber.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='contactAddress'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='Contact Address'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.contactAddress)}
                      />
                    )}
                  />
                  {errors.contactAddress && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.contactAddress.message}</FormHelperText>
                  )}
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
            disabled={
              !isDirty ||
              Boolean(
                errors.fullName ||
                  errors.nationality ||
                  errors.phoneNumber ||
                  errors.idType ||
                  errors.idNumber ||
                  errors.contactAddress
              )
            }
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
