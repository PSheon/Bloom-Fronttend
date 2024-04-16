// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
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

// ** Custom Component Imports
import AnnouncementEditBannerPreviewBox from 'src/views/management/announcement/edit/boxes/AnnouncementEditBannerPreviewBox'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/announcement'

// ** Util Imports
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import { AnnouncementType } from 'src/types/api/announcementTypes'

// ** Styled Components
const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

const schema = yup.object().shape({
  displayName: yup.string().min(3).required()
})

interface Props {
  initAnnouncementEntity: AnnouncementType
}
interface FormData {
  displayName: string
}

const AnnouncementEditProfileCard = (props: Props) => {
  // ** Props
  const { initAnnouncementEntity } = props

  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  // ** Hooks
  const [
    updateAnnouncement,
    { data: updatedAnnouncement = initAnnouncementEntity, isLoading: isUpdateAnnouncementLoading }
  ] = useUpdateOneMutation()
  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      displayName: initAnnouncementEntity.displayName
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Logics
  const handleEditOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)
  const onSubmit = async (data: FormData) => {
    const { displayName } = data

    await updateAnnouncement({
      id: initAnnouncementEntity.id,
      data: { displayName }
    })
    reset(undefined, { keepValues: true, keepDirty: false, keepDefaultValues: false })
    handleEditClose()
  }

  return (
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <AnnouncementEditBannerPreviewBox initAnnouncementEntity={updatedAnnouncement} />
        <Typography variant='h6' sx={{ mt: 4, mb: 2, wordBreak: 'break-word' }}>
          {updatedAnnouncement.displayName}
        </Typography>
        <CustomChip
          skin='light'
          size='small'
          label={updatedAnnouncement.isPublished ? '已發布' : '草稿'}
          color={updatedAnnouncement.isPublished ? 'success' : 'warning'}
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
              <Icon icon='mdi:poll' />
            </CustomAvatar>
            <div>
              <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                1,000
              </Typography>
              <Typography variant='body2'>觀看次數</Typography>
            </div>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' variant='rounded' color='info' sx={{ mr: 3 }}>
              <Icon icon='mdi:like-outline' />
            </CustomAvatar>
            <div>
              <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                1,000
              </Typography>
              <Typography variant='body2'>已按讚</Typography>
            </div>
          </Box>
        </Box>
      </CardContent>

      <CardContent>
        <Typography variant='subtitle2'>公告資料</Typography>
        <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
        <Box sx={{ pt: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              分類:
            </Typography>
            <Typography variant='body2'>abc</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              標籤:
            </Typography>
            <Typography variant='body2'>abc</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              作者
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Avatar
                src={getPublicMediaAssetUrl(
                  initAnnouncementEntity.author.data?.attributes.avatar?.data?.attributes.url
                )}
                variant='rounded'
                sx={{ mr: 3, width: 34, height: 34 }}
              />
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <LinkStyled
                  href={`/management/user/edit/${initAnnouncementEntity.id}`}
                  sx={{ fontWeight: 600, color: 'text.primary' }}
                >
                  {initAnnouncementEntity.author.data?.attributes.username}
                </LinkStyled>
                <Typography noWrap variant='caption'>
                  {initAnnouncementEntity.author.data?.attributes.email}
                </Typography>
              </Box>
            </Box>
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
        aria-labelledby='announcement-view-edit'
        aria-describedby='announcement-view-edit-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800 } }}
      >
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            id='announcement-view-edit'
            sx={{
              textAlign: 'center',
              fontSize: '1.5rem !important',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            編輯公告
          </DialogTitle>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <DialogContentText
              variant='body2'
              id='announcement-view-edit-description'
              sx={{ textAlign: 'center', mb: 7 }}
            >
              更新公告詳細資訊將接受隱私審核
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
                        label='公告標題'
                        placeholder='公告'
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
              {/* <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='phone'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='電話號碼'
                        placeholder='0988888888'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.phone)}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>台灣 (+886)</InputAdornment>
                        }}
                        sx={{ display: 'flex' }}
                      />
                    )}
                  />
                  {errors.phone && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>}
                </FormControl>
              </Grid> */}
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
              loading={isUpdateAnnouncementLoading}
              disabled={!isDirty || Boolean(errors.displayName)}
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

export default AnnouncementEditProfileCard
