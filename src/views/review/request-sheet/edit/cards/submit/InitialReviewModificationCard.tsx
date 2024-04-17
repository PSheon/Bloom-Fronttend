// ** MUI Imports
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getProcessStatusList, getRequestSheetProcessStatusAttributes } from 'src/utils'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Type Imports
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const InitialReviewModificationCard = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  // ** Vars
  const PROCESS_STATUS_LIST = getProcessStatusList()
  const { color, processPercentage } = getRequestSheetProcessStatusAttributes(initRequestSheetEntity.processStatus)

  return (
    <Card>
      <CardContent>
        <Stack spacing={4}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <CustomChip skin='light' size='small' rounded color={color} label='此階段工作' />
          </Stack>

          <Stack spacing={2}>
            <Stack direction='row' spacing={2} alignItems='center' sx={{ '& svg': { color: 'text.secondary' } }}>
              <Icon icon='mdi:circle' fontSize='0.625rem' />
              <Typography component='span' sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                請參考審查委員的修改意見
              </Typography>
            </Stack>
            <Stack direction='row' spacing={2} alignItems='center' sx={{ '& svg': { color: 'text.secondary' } }}>
              <Icon icon='mdi:circle' fontSize='0.625rem' />
              <Typography component='span' sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                修改計畫書
              </Typography>
            </Stack>
            <Stack direction='row' spacing={2} alignItems='center' sx={{ '& svg': { color: 'text.secondary' } }}>
              <Icon icon='mdi:circle' fontSize='0.625rem' />
              <Typography component='span' sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                上傳計畫書
              </Typography>
            </Stack>
          </Stack>

          <Stack spacing={2}>
            <Stack direction='row' spacing={2} sx={{ justifyContent: 'space-between' }}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                進度
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                {`${PROCESS_STATUS_LIST.indexOf(initRequestSheetEntity.processStatus)} / ${
                  PROCESS_STATUS_LIST.length - 1
                } 階段`}
              </Typography>
            </Stack>
            <LinearProgress value={processPercentage} variant='determinate' sx={{ height: 8, borderRadius: '5px' }} />
            <Typography variant='caption' sx={{ mt: 1.5, mb: 6 }}>
              使用者正在修改計畫書
            </Typography>
          </Stack>

          <Button fullWidth variant='contained' color='primary' disabled>
            使用者正在修改
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default InitialReviewModificationCard
