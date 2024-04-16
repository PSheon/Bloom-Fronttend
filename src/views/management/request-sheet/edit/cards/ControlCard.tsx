// ** MUI Imports
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/requestSheet'

// ** Util Imports
import { getProcessStatusList, getRequestSheetProcessStatusAttributes } from 'src/utils'

// ** Type Imports
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
  isEditMode: boolean
  handleToggleEditMode: () => void
}

const ControlCard = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity, isEditMode, handleToggleEditMode } = props

  // ** Vars
  const PROCESS_STATUS_LIST = getProcessStatusList()
  const { color, processPercentage } = getRequestSheetProcessStatusAttributes(initRequestSheetEntity.processStatus)

  // ** Hooks
  const [updateRequestSheet, { data: updatedRequestSheet = initRequestSheetEntity }] = useUpdateOneMutation()

  // ** Logics
  const handleProcessStatusChange = async (event: SelectChangeEvent) => {
    await updateRequestSheet({
      id: initRequestSheetEntity.id,
      data: {
        processStatus: event.target.value as RequestSheetType['processStatus']
      }
    })
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={4}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <CustomChip skin='light' size='small' rounded color={color} label='操作面板' />
          </Stack>

          <Stack spacing={2}>
            <Stack direction='row' spacing={2} alignItems='center' sx={{ '& svg': { color: 'text.secondary' } }}>
              <Icon icon='mdi:circle' fontSize='0.625rem' />
              <Typography component='span' sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                切換編輯模式
              </Typography>
            </Stack>

            <Button
              fullWidth
              variant={isEditMode ? 'outlined' : 'contained'}
              color='primary'
              onClick={handleToggleEditMode}
            >
              {isEditMode ? '回到預覽模式' : '編輯模式'}
            </Button>
          </Stack>

          <Stack spacing={2}>
            <Stack direction='row' spacing={2} alignItems='center' sx={{ '& svg': { color: 'text.secondary' } }}>
              <Icon icon='mdi:circle' fontSize='0.625rem' />
              <Typography component='span' sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                切換申請階段
              </Typography>
            </Stack>

            <Select
              fullWidth
              value={updatedRequestSheet.processStatus || 'Filling out the sheet'}
              sx={{ mb: 4 }}
              onChange={handleProcessStatusChange}
            >
              <MenuItem value='Filling out the sheet'>填表中</MenuItem>
              <MenuItem value='Initial review'>初審中</MenuItem>
              <MenuItem value='Initial review modification'>初審修改中</MenuItem>
              <MenuItem value='Secondary review'>複審中</MenuItem>
              <MenuItem value='Secondary review modification'>複審修改中</MenuItem>
              <MenuItem value='Completed'>已完成申請</MenuItem>
            </Select>

            <Stack direction='row' spacing={2} sx={{ justifyContent: 'space-between' }}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                進度
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                {`${PROCESS_STATUS_LIST.indexOf(updatedRequestSheet.processStatus)} / ${
                  PROCESS_STATUS_LIST.length - 1
                } 階段`}
              </Typography>
            </Stack>
            <LinearProgress value={processPercentage} variant='determinate' sx={{ height: 8, borderRadius: '5px' }} />
            <Typography variant='caption' sx={{ mt: 1.5, mb: 6 }}>
              已完成所有申請階段
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ControlCard
