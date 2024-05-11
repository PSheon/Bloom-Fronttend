// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Components
import { styled, useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/package'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import ReviewFundEditPackageSkinSelectBox from 'src/views/review/fund/edit/boxes/ReviewFundEditPackageSkinSelectBox'
import ReviewFundEditPackageSlotAddPropertyButton from 'src/views/review/fund/edit/buttons/ReviewFundEditPackageSlotAddPropertyButton'

// ** Util Imports
import { getFundCurrencyProperties, getPackageStatusProperties, getFormattedPriceUnit } from 'src/utils'

// ** Type Imports
import type { GridProps } from '@mui/material/Grid'
import type { FundType } from 'src/types/api/fundTypes'
import type { PackageType, SkinType } from 'src/types/api/packageTypes'

// ** Styled Grid Component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

// ** Styled <sup> Component
const Sup = styled('sup')(({ theme }) => ({
  fontSize: '1.2rem',
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

const schema = yup.object().shape({
  displayName: yup.string().required(),
  description: yup.string().optional(),
  skin: yup.string().oneOf(['Green', 'Purple', 'Orange']).required(),
  priceInUnit: yup.number().required(),
  status: yup.string().oneOf(['Draft', 'Published', 'Archived']).required()
})

interface Props {
  initFundEntity: FundType
}
interface FormData {
  displayName: string
  description?: string
  skin: SkinType
  priceInUnit: number
  status: 'Draft' | 'Published' | 'Archived'
}

const ReviewFundEditDefaultPackagesGrid = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [selectedPackageEntity, setSelectedPackageEntity] = useState<PackageType | null>(null)

  // ** Hooks
  const theme = useTheme()
  const [updateOnePackage, { isLoading: isUpdateOnePackageLoading }] = useUpdateOneMutation()

  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      displayName: '',
      description: '',
      skin: 'Green' as SkinType,
      priceInUnit: 0,
      status: 'Draft' as 'Draft' | 'Published' | 'Archived'
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Vars
  const { defaultPackages: defaultPackagesData } = initFundEntity
  const defaultPackages = defaultPackagesData?.data?.map(pkg => ({ id: pkg.id, ...pkg.attributes }))
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initFundEntity.baseCurrency)

  // ** Logics
  const handleEditOpen = (packageEntity: PackageType) => {
    setSelectedPackageEntity(() => packageEntity)
    reset({
      displayName: packageEntity.displayName,
      description: packageEntity.description || '',
      skin: packageEntity.skin,
      priceInUnit: packageEntity.priceInUnit,
      status: packageEntity.status
    })
    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setSelectedPackageEntity(() => null)
    reset({
      displayName: '',
      description: '',
      skin: 'Green',
      priceInUnit: 0,
      status: 'Draft'
    })
    setOpenEdit(false)
  }

  const handleRemoveProperty = async (packageId: number, propertyId: number): Promise<void> => {
    const currentPackage = defaultPackages!.find(defaultPackage => defaultPackage.id === packageId)
    const currentSlot = currentPackage?.slot
    const newSlot = currentSlot?.filter(property => property.id !== propertyId)

    await updateOnePackage({
      id: packageId,
      data: { slot: newSlot }
    })
  }

  const onSubmit = async (data: FormData) => {
    const { displayName, description, skin, priceInUnit, status } = data

    await updateOnePackage({
      id: selectedPackageEntity!.id,
      data: { displayName, description, skin, priceInUnit, status }
    })
    reset(undefined, { keepValues: true, keepDirty: false, keepDefaultValues: false })
    handleEditClose()
  }

  // ** Renders
  if (!defaultPackages || defaultPackages?.length === 0) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <CustomAvatar skin='light' sx={{ width: 56, height: 56, mb: 2 }}>
                <Icon icon='mdi:exclamation-thick' fontSize='2rem' />
              </CustomAvatar>
              <Typography variant='h6' sx={{ mb: 2 }}>
                注意
              </Typography>
              <Typography variant='body2'>需要至少添加一个預設方案才能進行憑證發行</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={6}>
      {defaultPackages.map(defaultPackage => {
        const packageStatusProperties = getPackageStatusProperties(defaultPackage.status)

        return (
          <Grid key={`default-package-${defaultPackage.id}`} item xs={12}>
            <Card>
              <Grid container spacing={6}>
                <StyledGrid item md={5} xs={12} sx={{ position: 'relative' }}>
                  <Box sx={{ position: 'absolute', top: theme => theme.spacing(12), right: 16 }}>
                    <CustomChip
                      skin='light'
                      size='medium'
                      label={packageStatusProperties.displayName}
                      color={packageStatusProperties.color}
                      sx={{
                        height: 20,
                        fontWeight: 600,
                        borderRadius: '5px',
                        fontSize: '0.875rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { mt: -0.25 }
                      }}
                    />
                  </Box>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      width={180}
                      height={256}
                      alt={defaultPackage.displayName}
                      src={`/images/funds/packages/card-skin/${defaultPackage.skin.toLowerCase()}-${
                        theme.palette.mode
                      }.webp`}
                    />
                  </CardContent>
                </StyledGrid>
                <Grid
                  item
                  md={7}
                  xs={12}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    pt: theme => ['0 !important', '0 !important', `${theme.spacing(6)} !important`],
                    pl: theme => [`${theme.spacing(6)} !important`, `${theme.spacing(6)} !important`, '0 !important']
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                      <Stack direction='row' spacing={2} alignItems='center'>
                        <Box>
                          <CustomChip
                            skin='light'
                            size='medium'
                            label={<Typography variant='subtitle1'>{`#${defaultPackage.packageId}`}</Typography>}
                            color='secondary'
                            sx={{
                              height: 20,
                              fontWeight: 500,
                              fontSize: '0.75rem',
                              alignSelf: 'flex-start',
                              color: 'text.secondary'
                            }}
                          />
                        </Box>
                        <Typography variant='h6'>{defaultPackage.displayName}</Typography>
                      </Stack>

                      <Stack direction='row' sx={{ position: 'relative' }}>
                        <Sup>{fundBaseCurrencyProperties.symbol}</Sup>
                        <Typography
                          variant='h3'
                          sx={{
                            mb: -1.2,
                            ml: 2,
                            lineHeight: 1,
                            color: 'primary.main'
                          }}
                        >
                          {getFormattedPriceUnit(defaultPackage.priceInUnit)}
                        </Typography>
                      </Stack>
                    </Box>
                    <Typography variant='body2' sx={{ mb: 2 }}>
                      {defaultPackage.description || 'No description'}
                    </Typography>
                    <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />

                    <Stack spacing={2} justifyContent='center' sx={{ mb: 2 }}>
                      <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignContent='center'
                        sx={{ width: '100%' }}
                      >
                        <Typography variant='subtitle2'>Utility</Typography>

                        <ReviewFundEditPackageSlotAddPropertyButton initPackageEntity={defaultPackage} />
                      </Stack>

                      {defaultPackage.slot?.length === 0 ? (
                        <Typography sx={{ mb: 2 }}>尚未設定內容</Typography>
                      ) : (
                        defaultPackage.slot.map(property => {
                          return (
                            <Stack
                              key={`slot-${property.id}`}
                              direction='row'
                              justifyContent='space-between'
                              alignContent='center'
                              sx={{ width: '100%' }}
                            >
                              <Typography sx={{ mb: 2 }}>
                                {`${property.propertyType}:`}
                                <Box component='span' sx={{ fontWeight: 600 }}>
                                  {property.value}
                                </Box>
                              </Typography>

                              <IconButton
                                size='small'
                                onClick={() => handleRemoveProperty(defaultPackage.id, property.id)}
                              >
                                <Icon icon='mdi:close' fontSize={20} />
                              </IconButton>
                            </Stack>
                          )
                        })
                      )}
                    </Stack>
                  </CardContent>
                  <CardActions className='card-action-dense' sx={{ mt: 'auto' }}>
                    <Button
                      sx={{ '& svg': { mr: 2 } }}
                      onClick={() => {
                        handleEditOpen(defaultPackage)
                      }}
                    >
                      <Icon icon='mdi:edit-outline' fontSize={20} />
                      編輯方案
                    </Button>
                  </CardActions>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        )
      })}

      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby='package-view-edit'
        aria-describedby='package-view-edit-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800 } }}
      >
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            id='package-view-edit'
            sx={{
              textAlign: 'center',
              fontSize: '1.5rem !important',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            {`編輯方案 #${selectedPackageEntity?.packageId}`}
          </DialogTitle>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <DialogContentText variant='body2' id='package-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
              每個方案都必須提供不同的內容.
            </DialogContentText>

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
                    rules={{ required: true }}
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
                        <ReviewFundEditPackageSkinSelectBox
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
                        <ReviewFundEditPackageSkinSelectBox
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
                        <ReviewFundEditPackageSkinSelectBox
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

              <Grid item xs={12}>
                <Typography variant='subtitle1'>價格</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='priceInUnit'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        placeholder='$3,500'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.description)}
                        inputProps={{ type: 'number' }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start' sx={{ color: 'text.primary' }}>
                              <Icon icon='mdi:dollar' />
                            </InputAdornment>
                          )
                        }}
                        sx={{ display: 'flex' }}
                      />
                    )}
                  />
                  {errors.priceInUnit && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.priceInUnit.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1'>發布狀態</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='status'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        fullWidth
                        disabled={value === 'Published'}
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.status)}
                      >
                        <MenuItem value='Draft'>草稿</MenuItem>
                        <MenuItem value='Published'>發布中</MenuItem>
                        <MenuItem value='Archived'>已封存</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.status && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.status.message}</FormHelperText>
                  )}
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
              disabled={!isDirty || Boolean(errors.displayName || errors.description)}
              type='submit'
              variant='contained'
              startIcon={<Icon icon='mdi:content-save-outline' />}
            >
              更新
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default ReviewFundEditDefaultPackagesGrid
