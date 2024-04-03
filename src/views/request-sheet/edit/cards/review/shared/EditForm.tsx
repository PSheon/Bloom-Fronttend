// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { lighten } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'

// ** Api Imports
import { useUpdateMeOneMutation } from 'src/store/api/management/review'

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
  replyContent: yup.string().max(150).required()
})

interface FormData {
  replyContent: string
}

interface Props {
  initReviewEntity: ReviewType
}

const ReviewListEditForm = (props: Props) => {
  // ** Props
  const { initReviewEntity } = props

  // ** States
  const [showReply, setShowReply] = useState<boolean>(Boolean(initReviewEntity.replyContent))

  // ** Hooks
  const [updateOneReview, { isLoading: isUpdateOneReviewLoading }] = useUpdateMeOneMutation()
  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      replyContent: initReviewEntity.replyContent || ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Logics
  const handleShowReply = () => {
    setShowReply(true)
  }
  const onSubmit = async (data: FormData) => {
    const { replyContent } = data

    await updateOneReview({
      id: initReviewEntity.id,
      data: {
        replyContent
      }
    })
    reset(undefined, { keepValues: true, keepDirty: false, keepDefaultValues: false })
  }

  return (
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
              label={initReviewEntity.replyContent ? '已回覆' : '未回覆'}
              color={initReviewEntity.replyContent ? 'primary' : 'warning'}
            />
          </Stack>
        </Stack>
        <Stack direction='row' justifyContent='space-between' flex='1'>
          <TextField
            minRows={3}
            maxRows={5}
            multiline
            value={initReviewEntity.modificationSuggestions}
            fullWidth
            inputProps={{ readOnly: true }}
          />
        </Stack>
        <Collapse in={!showReply}>
          <Stack direction='row' flex='1'>
            <Button size='small' variant={showReply ? 'text' : 'contained'} onClick={handleShowReply}>
              回覆
            </Button>
          </Stack>
        </Collapse>
      </Stack>

      <Collapse in={showReply}>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} sx={{ pl: 6 }}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='subtitle1' noWrap sx={{ fontWeight: 600 }}>
                單位回覆
              </Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' flex='1'>
              <FormControl fullWidth>
                <Controller
                  name='replyContent'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      minRows={3}
                      maxRows={5}
                      multiline
                      placeholder='請回覆修改意見'
                      value={value}
                      fullWidth
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.replyContent)}
                    />
                  )}
                />
                {errors.replyContent && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.replyContent.message}</FormHelperText>
                )}
              </FormControl>
            </Stack>
            <Stack direction='row' alignItems='center' justifyContent='flex-end' spacing={4} flex='0'>
              <LoadingButton
                loading={isUpdateOneReviewLoading}
                disabled={!isDirty || Boolean(errors.replyContent)}
                type='submit'
                size='small'
                variant='contained'
              >
                儲存
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </Collapse>
    </Stack>
  )
}

export default ReviewListEditForm
