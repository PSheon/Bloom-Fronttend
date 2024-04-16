// ** MUI Imports
import { lighten } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'

// ** Third-Party Imports
import format from 'date-fns/format'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Util Imports
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import { ReviewType } from 'src/types/api/reviewTypes'

interface Props {
  initReviewEntity: ReviewType
}

const ReviewListViewForm = (props: Props) => {
  // ** Props
  const { initReviewEntity } = props

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
            value={initReviewEntity.modificationSuggestions ?? ''}
            fullWidth
            inputProps={{ readOnly: true }}
          />
        </Stack>
      </Stack>

      <Stack spacing={4} sx={{ pl: 6 }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='subtitle1' noWrap sx={{ fontWeight: 600 }}>
            單位回覆
          </Typography>
        </Stack>
        <Stack direction='row' justifyContent='space-between' flex='1'>
          <TextField
            minRows={3}
            maxRows={5}
            multiline
            placeholder='尚未回覆'
            value={initReviewEntity.replyContent ?? ''}
            fullWidth
            inputProps={{ readOnly: true }}
          />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ReviewListViewForm
