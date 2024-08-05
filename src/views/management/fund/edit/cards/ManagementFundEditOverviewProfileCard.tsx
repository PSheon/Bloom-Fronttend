// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Stack from '@mui/material/Stack'
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
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import format from 'date-fns/format'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DatePicker from 'react-datepicker'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Custom Component Imports
import ManagementFundEditBannerPreviewBox from 'src/views/management/fund/edit/boxes/ManagementFundEditBannerPreviewBox'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/fund'

// ** Util Imports
import { getFundStatusProperties } from 'src/utils'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

const schema = yup.object().shape({
  displayName: yup.string().required(),
  description: yup.string().optional(),
  saleStartTime: yup.date().required(),
  maturityDate: yup.date().required(),
  estimatedAPY: yup.number().required(),
  performanceFeePercentage: yup.number().required(),
  redemptionFrequencyInDays: yup.number().required(),
  discordUrl: yup.string().optional(),
  twitterUrl: yup.string().optional()
})

interface Props {
  initFundEntity: FundType
}
interface FormData {
  displayName: string
  description?: string
  saleStartTime: Date
  maturityDate: Date
  estimatedAPY: number
  performanceFeePercentage: number
  redemptionFrequencyInDays: number
  discordUrl?: string
  twitterUrl?: string
}

const ManagementFundEditOverviewProfileCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  // ** Hooks
  const [updateFund, { data: updatedFund = initFundEntity, isLoading: isUpdateFundLoading }] = useUpdateOneMutation()

  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      displayName: initFundEntity.displayName,
      description: initFundEntity.description || '',
      saleStartTime: new Date(initFundEntity.saleStartTime),
      maturityDate: new Date(initFundEntity.maturityDate),
      estimatedAPY: initFundEntity.estimatedAPY,
      performanceFeePercentage: initFundEntity.performanceFeePercentage,
      redemptionFrequencyInDays: initFundEntity.redemptionFrequencyInDays,
      discordUrl: initFundEntity.discordUrl || '',
      twitterUrl: initFundEntity.twitterUrl || ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Vars
  const statusProperties = getFundStatusProperties(initFundEntity.status)

  // ** Logics
  const handleEditOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  const onSubmit = async (data: FormData) => {
    const {
      displayName,
      description,
      saleStartTime,
      maturityDate,
      estimatedAPY,
      performanceFeePercentage,
      redemptionFrequencyInDays
    } = data

    await updateFund({
      id: initFundEntity.id,
      data: {
        displayName,
        description,
        saleStartTime,
        maturityDate,
        estimatedAPY,
        performanceFeePercentage,
        redemptionFrequencyInDays
      }
    })
    reset(undefined, { keepValues: true, keepDirty: false, keepDefaultValues: false })
    handleEditClose()
  }

  return (
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <ManagementFundEditBannerPreviewBox initFundEntity={updatedFund} />
        <Typography variant='h6' sx={{ mt: 4, mb: 2 }}>
          {initFundEntity.displayName}
        </Typography>
        <CustomChip
          skin='light'
          size='small'
          label={statusProperties.displayName}
          color={statusProperties.color}
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
            <CustomAvatar skin='light' variant='rounded' color='info' sx={{ mr: 3 }}>
              <Icon icon='mdi:twitter' />
            </CustomAvatar>
            <Box>
              <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                @twitter
              </Typography>
              <Typography variant='body2'>Twitter</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
              <Icon icon='ic:outline-discord' />
            </CustomAvatar>
            <Box>
              <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                @discord
              </Typography>
              <Typography variant='body2'>Discord</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>

      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant='subtitle2'>資金資料</Typography>
        <Stack alignSelf='stretch'>
          <Divider />
        </Stack>
        <Stack spacing={2.7}>
          <Stack direction='row' flexWrap='wrap' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' color='text.primary'>
              描述：
            </Typography>
            <Typography variant='body2'>{initFundEntity.description || '未說明'}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' color='text.primary'>
              創始日期：
            </Typography>
            <Typography variant='body2'>{format(new Date(initFundEntity.genesisDate), 'PPpp')}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' color='text.primary'>
              結束日期：
            </Typography>
            <Typography variant='body2'>{format(new Date(initFundEntity.maturityDate), 'PPpp')}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' color='text.primary'>
              預期APY：
            </Typography>
            <Typography variant='body2'>{`${initFundEntity.estimatedAPY}%`}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' color='text.primary'>
              績效手續費：
            </Typography>
            <Typography variant='body2'>{`${initFundEntity.performanceFeePercentage}%`}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' color='text.primary'>
              協議手續費：
            </Typography>
            <Typography variant='body2'>{`${0}%`}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' color='text.primary'>
              銷售開始日期：
            </Typography>
            <Typography variant='body2'>{format(new Date(initFundEntity.saleStartTime), 'PPpp')}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' color='text.primary'>
              兌換週期：
            </Typography>
            <Typography variant='body2'>
              {initFundEntity.redemptionFrequencyInDays ? `${initFundEntity.redemptionFrequencyInDays} 天` : '未設定'}
            </Typography>
          </Stack>
        </Stack>
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
          編輯資金資料
          <DialogContentText id='user-view-edit-description' variant='body2' component='p' sx={{ textAlign: 'center' }}>
            更新資金詳細資訊將接受隱私審核
          </DialogContentText>
        </DialogTitle>

        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`],
            pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`]
          }}
        >
          <DatePickerWrapper>
            <form noValidate autoComplete='off'>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' component='p'>
                    Metadata
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='displayName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label='名稱'
                          placeholder='資金名稱'
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
                          placeholder='資金說明'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.description)}
                        />
                      )}
                    />
                    {errors.description && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='subtitle2' component='p'>
                    Contract
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label='創始日期'
                      value={format(new Date(initFundEntity.genesisDate), 'PPpp')}
                      inputProps={{ readOnly: true }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='saleStartTime'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          selected={value}
                          popperPlacement='bottom-start'
                          dateFormat='PPpp'
                          showTimeSelect
                          timeFormat='HH:mm'
                          timeIntervals={15}
                          minDate={new Date(initFundEntity.genesisDate)}
                          maxDate={new Date(initFundEntity.maturityDate)}
                          onChange={(date: Date) => {
                            onChange(date)
                          }}
                          placeholderText='選擇銷售開始日期'
                          customInput={<TextField fullWidth label='銷售開始日期' />}
                        />
                      )}
                    />
                    {errors.saleStartTime && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.saleStartTime.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='maturityDate'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          selected={value}
                          popperPlacement='bottom-start'
                          dateFormat='PPpp'
                          showTimeSelect
                          timeFormat='HH:mm'
                          timeIntervals={15}
                          minDate={new Date(initFundEntity.genesisDate)}
                          onChange={(date: Date) => {
                            onChange(date)
                          }}
                          placeholderText='選擇結束日期'
                          customInput={<TextField fullWidth label='結束日期' />}
                        />
                      )}
                    />
                    {errors.maturityDate && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.maturityDate.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='estimatedAPY'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          type='number'
                          label='預期APY'
                          placeholder='14%'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <Icon icon='mdi:percent-outline' fontSize={18} />
                              </InputAdornment>
                            )
                          }}
                          error={Boolean(errors.estimatedAPY)}
                        />
                      )}
                    />
                    {errors.estimatedAPY && (
                      <FormHelperText sx={{ color: 'error.main' }} id='fund-edit-estimated-apy'>
                        {errors.estimatedAPY.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      id='fund-edit-performance-fee-percentage'
                      error={Boolean(errors.performanceFeePercentage)}
                      htmlFor='fund-edit-performance-fee-percentage'
                    >
                      績效手續費
                    </InputLabel>
                    <Controller
                      name='performanceFeePercentage'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label='績效手續費'
                          onChange={onChange}
                          error={Boolean(errors.performanceFeePercentage)}
                          labelId='fund-edit-performance-fee-percentage'
                          aria-describedby='fund-edit-performance-fee-percentage'
                        >
                          <MenuItem value={0}>0%</MenuItem>
                          <MenuItem value={5}>5%</MenuItem>
                          <MenuItem value={10}>10%</MenuItem>
                          <MenuItem value={15}>15%</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.performanceFeePercentage && (
                      <FormHelperText sx={{ color: 'error.main' }} id='fund-edit-performance-fee-percentage'>
                        {errors.performanceFeePercentage.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      id='fund-edit-redemption-frequency-in-days'
                      error={Boolean(errors.redemptionFrequencyInDays)}
                      htmlFor='fund-edit-redemption-frequency-in-days'
                    >
                      兌換週期
                    </InputLabel>
                    <Controller
                      name='redemptionFrequencyInDays'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label='兌換週期'
                          onChange={onChange}
                          error={Boolean(errors.redemptionFrequencyInDays)}
                          labelId='fund-edit-redemption-frequency-in-days'
                          aria-describedby='fund-edit-redemption-frequency-in-days'
                        >
                          <MenuItem value={7}>7 Days</MenuItem>
                          <MenuItem value={14}>14 Days</MenuItem>
                          <MenuItem value={30}>30 Days</MenuItem>
                          <MenuItem value={60}>60 Days</MenuItem>
                          <MenuItem value={90}>90 Days</MenuItem>
                          <MenuItem value={180}>180 Days</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.redemptionFrequencyInDays && (
                      <FormHelperText sx={{ color: 'error.main' }} id='fund-edit-redemption-frequency-in-days'>
                        {errors.redemptionFrequencyInDays.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='subtitle2' component='p'>
                    Socials
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction='row' spacing={4} alignItems='center'>
                    <CustomAvatar skin='light' variant='rounded' color='info' sx={{ mr: 3 }}>
                      <Icon icon='mdi:twitter' />
                    </CustomAvatar>
                    <FormControl fullWidth>
                      <Controller
                        name='twitterUrl'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            label='Twitter'
                            size='small'
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <Icon icon='mdi:at' fontSize={18} />
                                </InputAdornment>
                              )
                            }}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.twitterUrl)}
                          />
                        )}
                      />
                      {errors.twitterUrl && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.twitterUrl.message}</FormHelperText>
                      )}
                    </FormControl>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction='row' spacing={4} alignItems='center'>
                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                      <Icon icon='ic:outline-discord' />
                    </CustomAvatar>
                    <FormControl fullWidth>
                      <Controller
                        name='discordUrl'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            label='Discord'
                            size='small'
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <Icon icon='mdi:at' fontSize={18} />
                                </InputAdornment>
                              )
                            }}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.discordUrl)}
                          />
                        )}
                      />
                      {errors.discordUrl && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.discordUrl.message}</FormHelperText>
                      )}
                    </FormControl>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </DatePickerWrapper>
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
            loading={isUpdateFundLoading}
            disabled={!isDirty || Boolean(errors.displayName || errors.description)}
            variant='contained'
            startIcon={<Icon icon='mdi:content-save-outline' />}
            onClick={handleSubmit(onSubmit)}
          >
            更新
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default ManagementFundEditOverviewProfileCard
