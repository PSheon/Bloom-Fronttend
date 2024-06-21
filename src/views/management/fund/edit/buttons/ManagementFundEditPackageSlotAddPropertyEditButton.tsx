// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Components
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/package'

// ** Type Imports
import type { PackageType, SlotType } from 'src/types/packageTypes'

const schema = yup.object().shape({
  propertyName: yup.string().oneOf(['DisplayName', 'APY', 'MinimumStakingPeriod']).required(),
  description: yup.string().optional(),
  value: yup.string().required(),
  order: yup.number().required(),
  displayType: yup.string().oneOf(['string', 'number']).required()
})

interface Props {
  initPackageEntity: PackageType
  initPropertyEntity: SlotType
  handleRemoveProperty: (packageId: number, propertyId: number) => Promise<void>
}
interface FormData {
  propertyName: 'DisplayName' | 'APY' | 'MinimumStakingPeriod'
  description?: string
  value: string
  order: number
  displayType: 'string' | 'number'
}

const ManagementFundEditPackageSlotAddPropertyEditButton = (props: Props) => {
  // ** Props
  const { initPackageEntity, initPropertyEntity, handleRemoveProperty } = props

  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  // ** Hooks
  const [updateOnePackage, { isLoading: isUpdateOnePackageLoading }] = useUpdateOneMutation()

  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      propertyName: initPropertyEntity.propertyName,
      description: initPropertyEntity.description ?? '',
      value: initPropertyEntity.value,
      order: initPropertyEntity.order,
      displayType: initPropertyEntity.displayType
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Logics
  const handleEditOpen = () => {
    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setOpenEdit(false)
  }

  const onSubmit = async (data: FormData) => {
    const { propertyName, value, order, displayType } = data

    const updatedSlots = initPackageEntity!.slots.map(slot => {
      if (slot.id === initPropertyEntity.id) {
        return {
          ...slot,
          propertyName,
          value,
          order,
          displayType
        }
      }

      return slot
    })

    await updateOnePackage({
      id: initPackageEntity!.id,
      data: {
        slots: updatedSlots
      }
    })

    reset(undefined, { keepValues: true, keepDirty: false, keepDefaultValues: false })
    handleEditClose()
  }

  return (
    <Fragment>
      <IconButton size='small' onClick={handleEditOpen}>
        <Icon icon='mdi:edit-box-outline' fontSize={20} />
      </IconButton>

      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby='property-view-edit'
        aria-describedby='property-view-edit-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800, position: 'relative' } }}
      >
        <IconButton size='small' onClick={handleEditClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>

        <DialogTitle
          id='property-view-edit'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          Edit Utility Property
          <DialogContentText
            id='property-view-edit-description'
            variant='body2'
            component='p'
            sx={{ textAlign: 'center' }}
          >
            Utility properties are used to display additional information about the package.
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
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='utility-edit-property-name-label'>Property Name</InputLabel>
                  <Controller
                    name='propertyName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        fullWidth
                        labelId='utility-edit-property-name-label'
                        label='Property Name'
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.propertyName)}
                      >
                        <MenuItem value='DisplayName'>DisplayName</MenuItem>
                        <MenuItem value='APY'>APY</MenuItem>
                        <MenuItem value='MinimumStakingPeriod'>MinimumStakingPeriod</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.propertyName && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.propertyName.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='description'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='Description'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.description)}
                        sx={{ display: 'flex' }}
                      />
                    )}
                  />
                  {errors.description && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='value'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='Value'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.value)}
                        sx={{ display: 'flex' }}
                      />
                    )}
                  />
                  {errors.value && <FormHelperText sx={{ color: 'error.main' }}>{errors.value.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='order'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='Order'
                        type='number'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.order)}
                        sx={{ display: 'flex' }}
                      />
                    )}
                  />
                  {errors.order && <FormHelperText sx={{ color: 'error.main' }}>{errors.order.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='utility-edit-display-type-label'>Display Type</InputLabel>
                  <Controller
                    name='displayType'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        fullWidth
                        labelId='utility-edit-display-type-label'
                        label='Display Type'
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.displayType)}
                      >
                        <MenuItem value='string'>String</MenuItem>
                        <MenuItem value='number'>Number</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.displayType && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.displayType.message}</FormHelperText>
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
          <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
            <LoadingButton
              loading={isUpdateOnePackageLoading}
              variant='outlined'
              color='error'
              startIcon={<Icon icon='mdi:remove-box-outline' />}
              onClick={() => handleRemoveProperty(initPackageEntity.id, initPropertyEntity.id)}
            >
              Remove
            </LoadingButton>
            <LoadingButton
              loading={isUpdateOnePackageLoading}
              disabled={!isDirty || Boolean(errors.propertyName || errors.value)}
              variant='contained'
              startIcon={<Icon icon='mdi:content-save-outline' />}
              onClick={handleSubmit(onSubmit)}
            >
              Update
            </LoadingButton>
          </Stack>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default ManagementFundEditPackageSlotAddPropertyEditButton
