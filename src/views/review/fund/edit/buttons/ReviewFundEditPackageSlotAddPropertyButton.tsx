// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Components
import Grid from '@mui/material/Grid'
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
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Api Imports
import { useUpdateOneMutation } from 'src/store/api/management/package'

// ** Types
import { PackageType } from 'src/types/api/packageTypes'

const schema = yup.object().shape({
  propertyType: yup.string().oneOf(['DisplayName', 'Period']).required(),
  value: yup.string().nullable()
})

interface Props {
  initPackageEntity: PackageType
}
interface FormData {
  propertyType: 'DisplayName' | 'Period'
  value: string
}

const ReviewFundEditPackageSlotAddPropertyButton = (props: Props) => {
  // ** Props
  const { initPackageEntity } = props

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
      propertyType: 'DisplayName' as 'DisplayName' | 'Period',
      value: ''
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
    const { propertyType, value } = data

    const currentSlot = initPackageEntity!.slot

    await updateOnePackage({
      id: initPackageEntity!.id,
      data: {
        slot: [
          ...currentSlot,
          {
            propertyType,
            value
          }
        ]
      }
    })
    reset(undefined, { keepValues: true, keepDirty: false, keepDefaultValues: false })
    handleEditClose()
  }

  return (
    <Fragment>
      <IconButton size='small' onClick={handleEditOpen}>
        <Icon icon='mdi:plus' fontSize={20} />
      </IconButton>

      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby='property-view-edit'
        aria-describedby='property-view-edit-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800 } }}
      >
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            id='property-view-edit'
            sx={{
              textAlign: 'center',
              fontSize: '1.5rem !important',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            新增賦能
          </DialogTitle>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <DialogContentText variant='body2' id='property-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
              請選擇賦能類型
            </DialogContentText>

            <Grid container spacing={6}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='propertyType'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select fullWidth value={value} onChange={onChange} error={Boolean(errors.propertyType)}>
                        <MenuItem value='DisplayName'>DisplayName</MenuItem>
                        <MenuItem value='Period'>Period</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.propertyType && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.propertyType.message}</FormHelperText>
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
                        label='數值'
                        placeholder='賦能數值'
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
              loading={isUpdateOnePackageLoading}
              disabled={!isDirty || Boolean(errors.propertyType || errors.value)}
              type='submit'
              variant='contained'
              startIcon={<Icon icon='mdi:content-save-outline' />}
            >
              新增
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default ReviewFundEditPackageSlotAddPropertyButton
