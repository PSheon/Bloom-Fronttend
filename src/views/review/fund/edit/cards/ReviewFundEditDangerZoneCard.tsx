// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ReviewFundEditDangerZoneCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** States
  const [open, setOpen] = useState<boolean>(false)

  // ** Logics
  const handleOpenArchiveFundDialog = () => setOpen(true)
  const handleCloseArchiveFundDialog = () => setOpen(false)

  return (
    <Fragment>
      <Card>
        <CardHeader title='危險區域' />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                封存資金將無法繼續蒐集申請資料，並且無法復原
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button disabled variant='outlined' color='error' type='submit' onClick={handleOpenArchiveFundDialog}>
                封存
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleCloseArchiveFundDialog}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          {`確認要封存 ${initFundEntity.displayName}？`}
          <DialogContentText id='user-view-edit-description' variant='body2' component='p' sx={{ textAlign: 'center' }}>
            此操作將無法復原
          </DialogContentText>
        </DialogTitle>
        <DialogActions
          sx={{
            justifyContent: 'space-between',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(4)} !important`],
            pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(7.5)} !important`]
          }}
        >
          <Button variant='outlined' onClick={handleCloseArchiveFundDialog}>
            取消
          </Button>
          <Button variant='contained' color='error' startIcon={<Icon icon='mdi:delete-outline' />}>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default ReviewFundEditDangerZoneCard
