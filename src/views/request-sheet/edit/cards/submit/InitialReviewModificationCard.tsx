// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateMeOneMutation } from 'src/store/api/management/requestSheet'

// ** Util Imports
import { getProcessStatusList, getRequestSheetProcessStatusAttributes } from 'src/utils'

// ** Type Imports
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const InitialReviewModificationCard = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  // ** States
  const [open, setOpen] = useState<boolean>(false)

  // ** Vars
  const PROCESS_STATUS_LIST = getProcessStatusList()
  const { color, processPercentage } = getRequestSheetProcessStatusAttributes(initRequestSheetEntity.processStatus)

  // ** Hooks
  const [updateRequestSheet, { isLoading: isUpdateRequestSheetLoading }] = useUpdateMeOneMutation()

  // ** Logics
  const handleOpenAbandonDialog = () => setOpen(true)
  const handleCloseAbandonDialog = () => setOpen(false)
  const handleSubmit = async () => {
    await updateRequestSheet({
      id: initRequestSheetEntity.id,
      data: {
        processStatus: PROCESS_STATUS_LIST[PROCESS_STATUS_LIST.indexOf(initRequestSheetEntity.processStatus) + 1]
      }
    })
  }

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
              送出後，審查委員將會進行審查並給予修改意見
            </Typography>
          </Stack>

          <Button fullWidth variant='contained' color='primary' onClick={handleOpenAbandonDialog}>
            提交複審申請
          </Button>
        </Stack>
      </CardContent>

      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleCloseAbandonDialog}>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(6)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              '& svg': { mb: 6, color: 'warning.main' }
            }}
          >
            <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
            <Typography>
              送出後將無法修改申請內容，直到委員給予修改建議，請確認申請內容皆正確無誤，若有問題請聯繫承辦單位
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Grid container spacing={6} justifyContent='center'>
            <Grid item>
              <Button variant='outlined' onClick={handleCloseAbandonDialog}>
                取消
              </Button>
            </Grid>
            <Grid item>
              <LoadingButton fullWidth loading={isUpdateRequestSheetLoading} variant='contained' onClick={handleSubmit}>
                確認
              </LoadingButton>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default InitialReviewModificationCard
