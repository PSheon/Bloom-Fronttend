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

// ** Third-Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/package'

// ** Type Imports
import type { PackageType } from 'src/types/packageTypes'

const schema = yup.object().shape({
  propertyName: yup.string().oneOf(['DisplayName', 'APY', 'MinimumStakingPeriod']).required(),
  description: yup.string().optional(),
  value: yup.string().required(),
  displayValue: yup.string().optional(),
  isIntrinsic: yup.boolean().required(),
  order: yup.number().required(),
  displayType: yup.string().oneOf(['string', 'number']).required()
})

interface Props {
  initPackageEntity: PackageType
}
interface FormData {
  propertyName: 'DisplayName' | 'APY' | 'MinimumStakingPeriod'
  value: string
  displayValue?: string
  isIntrinsic: boolean
  order: number
  displayType: 'string' | 'number'
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
      propertyName: 'DisplayName',
      value: '',
      displayValue: '',
      isIntrinsic: false,
      order: 1,
      displayType: 'string'
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
    const { propertyName, value, isIntrinsic, order, displayType } = data

    const currentSlots = initPackageEntity!.slots

    await updateOnePackage({
      id: initPackageEntity!.id,
      data: {
        slots: [
          ...currentSlots,
          {
            propertyName,
            value,
            isIntrinsic,
            order,
            displayType
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
          新增賦能
          <DialogContentText
            id='property-view-edit-description'
            variant='body2'
            component='p'
            sx={{ textAlign: 'center' }}
          >
            請選擇賦能類型
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
                  <Controller
                    name='propertyName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select fullWidth value={value} onChange={onChange} error={Boolean(errors.propertyName)}>
                        <MenuItem value='DisplayName'>DisplayName</MenuItem>
                        <MenuItem value='Period'>Period</MenuItem>
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
            loading={isUpdateOnePackageLoading}
            disabled={!isDirty || Boolean(errors.propertyName || errors.value)}
            variant='contained'
            startIcon={<Icon icon='mdi:content-save-outline' />}
            onClick={handleSubmit(onSubmit)}
          >
            新增
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default ReviewFundEditPackageSlotAddPropertyButton
