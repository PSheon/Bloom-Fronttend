// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Custom Component Imports
import ManagementFundEditPackageSkinSelectBox from 'src/views/management/fund/edit/boxes/ManagementFundEditPackageSkinSelectBox'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useCreateMutation } from 'src/store/api/management/package'
import { useUpdateOneMutation } from 'src/store/api/management/fund'

// ** Util Imports
import { getNextValidPackageId } from 'src/utils'

// ** Type Imports
import type { Ref, ReactElement } from 'react'
import type { FadeProps } from '@mui/material/Fade'
import type { FundType } from 'src/types/fundTypes'
import type { SkinType } from 'src/types/packageTypes'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const schema = yup.object().shape({
  displayName: yup.string().required(),
  description: yup.string().optional(),
  skin: yup.string().oneOf(['Green', 'Purple', 'Orange']).required()
})

interface Props {
  initFundEntity: FundType
}
interface FormData {
  displayName: string
  description?: string
  skin: SkinType
}

const ManagementFundEditOverviewCreateDefaultPackageStack = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** States
  const [show, setShow] = useState<boolean>(false)

  // ** Hooks
  const [createNewPackage, { isLoading: isCreateNewPackageLoading }] = useCreateMutation()
  const [updateFund, { isLoading: isUpdateOneFundLoading }] = useUpdateOneMutation()

  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      displayName: '',
      description: '',
      skin: 'Green' as SkinType
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Logics
  const handleOpen = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  const onSubmit = async (data: FormData) => {
    const { displayName, description, skin } = data

    const createdPackageData = await createNewPackage({
      data: {
        packageId: getNextValidPackageId(initFundEntity),
        displayName,
        description,
        skin: skin
      }
    }).unwrap()

    let newDefaultPackages: number[] = []

    if (initFundEntity?.defaultPackages?.data?.length) {
      newDefaultPackages = [...initFundEntity.defaultPackages.data.map(pkg => pkg.id)]
    }

    if (createdPackageData?.id) {
      newDefaultPackages.push(createdPackageData.id)
    }

    await updateFund({
      id: initFundEntity.id,
      data: {
        defaultPackages: newDefaultPackages
      }
    })

    reset(undefined)
    handleClose()
  }

  return (
    <Stack direction='row' spacing={4} alignItems='center'>
      <Stack flex='1'>
        <Typography variant='h5' component='p'>
          Packages
        </Typography>
        <Typography variant='body2' component='p'>
          Provide a solution for investors to understand how the fund works with their funds
        </Typography>
      </Stack>
      <Stack>
        <Button variant='contained' onClick={handleOpen}>
          New
        </Button>
      </Stack>

      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby='package-view-edit'
        aria-describedby='package-view-edit-description'
        TransitionComponent={Transition}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800, position: 'relative' } }}
      >
        <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>

        <DialogTitle
          id='package-view-edit'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          New Package
          <DialogContentText
            id='package-view-edit-description'
            variant='body2'
            component='p'
            sx={{ textAlign: 'center' }}
          >
            Must provide different content for each package
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
                    name='displayName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='名稱'
                        placeholder='方案一'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.displayName)}
                      />
                    )}
                  />
                  {errors.displayName && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.displayName.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='description'
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='說明'
                        placeholder='方案概述'
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
                <Typography variant='subtitle1'>卡面色系</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={3} sm='auto'>
                    <Controller
                      name='skin'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <ManagementFundEditPackageSkinSelectBox
                          selected={value as SkinType}
                          value='Green'
                          handleClick={() => {
                            onChange('Green')
                          }}
                          sx={{
                            background: 'linear-gradient(209.44deg, #1C8D35 11.36%, #EEF086 81.96%)',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3} sm='auto'>
                    <Controller
                      name='skin'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <ManagementFundEditPackageSkinSelectBox
                          selected={value as SkinType}
                          value='Purple'
                          handleClick={() => {
                            onChange('Purple')
                          }}
                          sx={{
                            background: 'linear-gradient(209.44deg, #4B88FF 11.36%, #FF9898 81.96%)',
                            backdropFilter: 'blur(1080.41px)'
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3} sm='auto'>
                    <Controller
                      name='skin'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <ManagementFundEditPackageSkinSelectBox
                          selected={value as SkinType}
                          value='Orange'
                          handleClick={() => {
                            onChange('Orange')
                          }}
                          sx={{
                            background: 'linear-gradient(209.44deg, #FF4B4B 11.36%, #FF9898 81.96%)'
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
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
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            取消
          </Button>
          <LoadingButton
            loading={isCreateNewPackageLoading || isUpdateOneFundLoading}
            disabled={!isDirty || Boolean(errors.displayName || errors.description)}
            variant='contained'
            startIcon={<Icon icon='mdi:add-circle-outline' />}
            onClick={handleSubmit(onSubmit)}
          >
            建立
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

export default ManagementFundEditOverviewCreateDefaultPackageStack
