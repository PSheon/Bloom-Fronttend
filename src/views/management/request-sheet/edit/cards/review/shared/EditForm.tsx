// ** MUI Imports
import { lighten, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Divider from '@mui/material/Divider'

// ** Api Imports
import { useUpdateOneMutation, useDeleteOneMutation } from 'src/store/api/management/review'

// ** Third Party Imports
import format from 'date-fns/format'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Utils Import
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Types
import { ReviewType } from 'src/types/api/reviewTypes'

const schema = yup.object().shape({
  modificationSuggestions: yup.string().max(150).required()
})

interface FormData {
  modificationSuggestions: string
}

interface Props {
  initReviewEntity: ReviewType
}

const ReviewListEditForm = (props: Props) => {
  // ** Props
  const { initReviewEntity } = props

  // ** Hooks
  const isDesktopView = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const [updateOneReview, { isLoading: isUpdateOneReviewLoading }] = useUpdateOneMutation()
  const [deleteOneReview, { isLoading: isDeleteOneReviewLoading }] = useDeleteOneMutation()
  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      modificationSuggestions: initReviewEntity.modificationSuggestions || ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Logics
  const handleDeleteOneReview = async (reviewId: number) => {
    await deleteOneReview(reviewId)
  }
  const onSubmit = async (data: FormData) => {
    const { modificationSuggestions } = data

    await updateOneReview({
      id: initReviewEntity.id,
      data: {
        modificationSuggestions
      }
    })
    reset(undefined, { keepValues: true, keepDirty: false, keepDefaultValues: false })
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Divider />
        <Stack spacing={4} flex='1'>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Stack direction='row' alignItems='center' spacing={4}>
              <Avatar
                src={getPublicMediaAssetUrl(initReviewEntity?.reviewer?.data?.attributes?.avatar?.data?.attributes.url)}
                alt={initReviewEntity?.reviewer?.data?.attributes?.username}
                sx={{
                  width: 40,
                  height: 40,
                  border: theme => `4px solid ${lighten(theme.palette.background.paper, 0.1)}`
                }}
              />
              <Stack justifyContent='center'>
                <Typography variant='subtitle1' noWrap sx={{ fontWeight: 600 }}>
                  {initReviewEntity?.reviewer?.data?.attributes?.username}
                </Typography>
                <Typography variant='caption' noWrap sx={{ fontWeight: 600 }}>
                  {format(new Date(initReviewEntity.updatedAt), 'yyyy/MM/dd HH:mm')}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction='row' alignItems='center' spacing={4}>
              <CustomChip
                skin='light'
                size='small'
                rounded
                label={!isDirty ? '已儲存' : '未儲存'}
                color={!isDirty ? 'primary' : 'warning'}
              />
            </Stack>
          </Stack>
          <Stack direction='row' justifyContent='space-between' flex='1'>
            <FormControl fullWidth>
              <Controller
                name='modificationSuggestions'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    minRows={3}
                    maxRows={5}
                    multiline
                    placeholder='請填寫修改意見'
                    value={value}
                    fullWidth
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.modificationSuggestions)}
                  />
                )}
              />
              {errors.modificationSuggestions && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.modificationSuggestions.message}</FormHelperText>
              )}
            </FormControl>
          </Stack>
        </Stack>
        <Stack direction='row' alignItems='center' justifyContent='flex-end' spacing={4} flex='0'>
          {isDesktopView && (
            <LoadingButton
              loading={isDeleteOneReviewLoading}
              onClick={() => handleDeleteOneReview(initReviewEntity.id)}
              size='small'
              color='error'
              variant='outlined'
            >
              刪除
            </LoadingButton>
          )}
          <LoadingButton
            loading={isUpdateOneReviewLoading}
            disabled={!isDirty || Boolean(errors.modificationSuggestions)}
            type='submit'
            size='small'
            variant='contained'
          >
            更新
          </LoadingButton>
        </Stack>

        <Stack spacing={4} sx={{ pl: 6 }}>
          <Typography variant='subtitle1' noWrap sx={{ fontWeight: 600 }}>
            單位回覆
          </Typography>
          <Stack direction='row' justifyContent='space-between' flex='1'>
            <TextField
              minRows={3}
              maxRows={5}
              multiline
              placeholder='尚未回覆'
              fullWidth
              inputProps={{ readOnly: true }}
            />
          </Stack>
        </Stack>
      </Stack>
    </form>
  )
}

export default ReviewListEditForm
