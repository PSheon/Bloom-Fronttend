// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Utils Import
import { getRequestSheetProcessStatusAttributes } from 'src/utils'

// ** Api Imports
import { useUpdateMeOneMutation } from 'src/store/api/management/requestSheet'

// ** Types
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const AbandonButton = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  // ** State
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  const [updateRequestSheet, { isLoading: isAbandonRequestSheetLoading }] = useUpdateMeOneMutation()

  // ** Vars
  const { views } = getRequestSheetProcessStatusAttributes(initRequestSheetEntity.processStatus)

  // ** Logics
  const handleOpenAbandonDialog = () => setOpen(true)
  const handleCloseAbandonDialog = () => setOpen(false)
  const handleAbandonRequestSheetClick = async () => {
    await updateRequestSheet({ id: initRequestSheetEntity.id, data: { processStatus: 'Abandoned' } })
    handleCloseAbandonDialog()
  }

  return (
    <Fragment>
      <Button
        fullWidth
        variant='outlined'
        color='error'
        disabled={views.applicant.abandonButton === 'view'}
        onClick={handleOpenAbandonDialog}
      >
        捨棄申請
      </Button>

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
            <Typography>確認要捨棄這個申請嗎？</Typography>
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
              <Button variant='contained' onClick={handleCloseAbandonDialog}>
                取消
              </Button>
            </Grid>
            <Grid item>
              <LoadingButton
                loading={isAbandonRequestSheetLoading}
                variant='outlined'
                color='error'
                onClick={handleAbandonRequestSheetClick}
              >
                確認
              </LoadingButton>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default AbandonButton
