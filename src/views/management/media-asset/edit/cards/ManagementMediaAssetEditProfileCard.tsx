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
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/mediaAsset'

// ** Util Imports
import { getMediaAssetFileAttributes } from 'src/utils'

// ** Type Imports
import type { MediaAssetType } from 'src/types/mediaAssetTypes'

const schema = yup.object().shape({
  name: yup.string().required(),
  alternativeText: yup.string().optional(),
  caption: yup.string().optional()
})

interface Props {
  initMediaAssetEntity: MediaAssetType
}
interface FormData {
  name: string
  alternativeText?: string
  caption?: string
}

const ManagementMediaAssetEditProfileCard = (props: Props) => {
  // ** Props
  const { initMediaAssetEntity } = props

  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  // ** Hooks
  const [updateMediaAsset, { data: updatedMediaAsset = initMediaAssetEntity, isLoading: isUpdateMediaAssetLoading }] =
    useUpdateOneMutation()

  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      name: initMediaAssetEntity.name,
      alternativeText: initMediaAssetEntity.alternativeText || '',
      caption: initMediaAssetEntity.caption || ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Vars
  const mediaAssetFileAttributes = getMediaAssetFileAttributes(updatedMediaAsset)

  // ** Logics
  const handleEditOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  const onSubmit = async (data: FormData) => {
    const { name, alternativeText, caption } = data

    await updateMediaAsset({
      id: initMediaAssetEntity.id,
      data: {
        fileInfo: {
          name,
          alternativeText,
          caption
        }
      }
    })
    reset(undefined, { keepValues: true, keepDirty: false, keepDefaultValues: false })
    handleEditClose()
  }

  return (
    <Card>
      <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CustomAvatar
          skin='light'
          variant='rounded'
          color={mediaAssetFileAttributes.color}
          sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
        >
          <Icon icon={mediaAssetFileAttributes.icon} fontSize={64} />
        </CustomAvatar>

        <CustomChip
          skin='light'
          size='small'
          label={initMediaAssetEntity.ext}
          color={mediaAssetFileAttributes.color}
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
              <Icon icon='mdi:storage' />
            </CustomAvatar>
            <div>
              <Typography variant='subtitle1' sx={{ lineHeight: 1.3 }}>
                {mediaAssetFileAttributes.formattedSize}
              </Typography>
              <Typography variant='body2'>容量</Typography>
            </div>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
              <Icon icon='tabler:dimensions' />
            </CustomAvatar>
            <div>
              <Typography variant='subtitle1' sx={{ lineHeight: 1.3 }}>
                {initMediaAssetEntity.width && initMediaAssetEntity.height
                  ? `${initMediaAssetEntity.width} x ${initMediaAssetEntity.height}`
                  : '-'}
              </Typography>
              <Typography variant='body2'>尺寸</Typography>
            </div>
          </Box>
        </Box>
      </CardContent>

      <CardContent>
        <Typography variant='subtitle2'>檔案資料</Typography>
        <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
        <Box sx={{ pt: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary', whiteSpace: 'nowrap' }}>
              檔案名稱:
            </Typography>
            <Typography variant='body2' noWrap>
              {updatedMediaAsset.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary', whiteSpace: 'nowrap' }}>
              替代名稱:
            </Typography>
            <Typography variant='body2' noWrap>
              {updatedMediaAsset.alternativeText}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem', whiteSpace: 'nowrap' }}>標題:</Typography>
            <Typography variant='body2' noWrap>
              {updatedMediaAsset.caption || '未填寫'}
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
        aria-labelledby='media-asset-view-edit'
        aria-describedby='media-asset-view-edit-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800 } }}
      >
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            id='media-asset-view-edit'
            sx={{
              textAlign: 'center',
              fontSize: '1.5rem !important',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            編輯文件
          </DialogTitle>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <DialogContentText
              variant='body2'
              id='media-asset-view-edit-description'
              sx={{ textAlign: 'center', mb: 7 }}
            >
              更新文件詳細資訊將接受隱私審核
            </DialogContentText>

            <Grid container spacing={6}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='檔案名稱'
                        placeholder='檔案'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.name)}
                      />
                    )}
                  />
                  {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='alternativeText'
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='替代名稱'
                        placeholder='替代名稱'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.alternativeText)}
                      />
                    )}
                  />
                  {errors.alternativeText && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.alternativeText.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='caption'
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='標題'
                        placeholder='標題'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.caption)}
                      />
                    )}
                  />
                  {errors.caption && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.caption.message}</FormHelperText>
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
              loading={isUpdateMediaAssetLoading}
              disabled={!isDirty || Boolean(errors.name || errors.alternativeText || errors.caption)}
              type='submit'
              variant='contained'
              endIcon={<Icon icon='mdi:content-save-outline' />}
            >
              儲存
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </Card>
  )
}

export default ManagementMediaAssetEditProfileCard
