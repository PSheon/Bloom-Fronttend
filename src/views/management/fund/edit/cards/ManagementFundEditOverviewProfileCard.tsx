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
import DialogContentText from '@mui/material/DialogContentText'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import format from 'date-fns/format'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import ManagementFundEditBannerPreviewBox from 'src/views/management/fund/edit/boxes/ManagementFundEditBannerPreviewBox'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/fund'

// ** Util Imports
import { getFundStatusProperties } from 'src/utils'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'

const schema = yup.object().shape({
  displayName: yup.string().required(),
  description: yup.string().nullable()
})

interface Props {
  initFundEntity: FundType
}
interface FormData {
  displayName: string
  description: string
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
      description: initFundEntity.description || ''
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
    const { displayName, description } = data

    await updateFund({
      id: initFundEntity.id,
      data: {
        displayName,
        description
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

      <CardContent>
        <Typography variant='subtitle2'>資金資料</Typography>
        <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
        <Box sx={{ pt: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              描述：
            </Typography>
            <Typography variant='body2'>{initFundEntity.description || '未說明'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              創始日期：
            </Typography>
            <Typography variant='body2'>{format(new Date(initFundEntity.genesisDate), 'PPpp')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              結束日期：
            </Typography>
            <Typography variant='body2'>{format(new Date(initFundEntity.maturityDate), 'PPpp')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              績效手續費：
            </Typography>
            <Typography variant='body2'>{`${initFundEntity.performanceFeePercentage}%`}</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              協議手續費：
            </Typography>
            <Typography variant='body2'>{`${0}%`}</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              銷售開始日期：
            </Typography>
            <Typography variant='body2'>{format(new Date(initFundEntity.saleStartTime), 'PPpp')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              兌換週期：
            </Typography>
            <Typography variant='body2'>
              {initFundEntity.redemptionFrequencyInDays ? `${initFundEntity.redemptionFrequencyInDays} 天` : '未設定'}
            </Typography>
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
            編輯資金資料
          </DialogTitle>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
              更新資金詳細資訊將接受隱私審核
            </DialogContentText>

            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='displayName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='稱謂'
                        placeholder='稱謂'
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
              loading={isUpdateFundLoading}
              disabled={!isDirty || Boolean(errors.displayName || errors.description)}
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

export default ManagementFundEditOverviewProfileCard
