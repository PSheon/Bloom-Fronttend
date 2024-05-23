// ** React Imports
import { useState } from 'react'

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

const MeAccountSecurityDangerZoneCard = () => {
  // ** States
  const [open, setOpen] = useState<boolean>(false)

  // ** Logics
  const handleOpenDeleteAccountDialog = () => setOpen(true)
  const handleCloseDeleteAccountDialog = () => setOpen(false)

  return (
    <Card>
      <CardHeader title='危險區域' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
              刪除帳號將會移除你的所有申請資料，並且無法復原 (未開放刪除帳號功能)
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button disabled variant='outlined' color='error' type='submit' onClick={handleOpenDeleteAccountDialog}>
              刪除帳號
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleCloseDeleteAccountDialog}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          確認要刪除你的帳號？
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
          <Button variant='outlined' color='secondary' onClick={handleCloseDeleteAccountDialog}>
            取消
          </Button>
          <Button variant='outlined' color='error' startIcon={<Icon icon='mdi:delete-outline' />}>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default MeAccountSecurityDangerZoneCard
