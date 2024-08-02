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
      <CardHeader title='Danger Zone' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography color='text.secondary' sx={{ fontWeight: 600 }}>
              {`It'll remove all your application data and can't be undone (Delete account feature is not available)`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button disabled variant='outlined' color='error' type='submit' onClick={handleOpenDeleteAccountDialog}>
              Delete account
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
          Are you sure you want to delete your account?
          <DialogContentText id='user-view-edit-description' variant='body2' component='p' sx={{ textAlign: 'center' }}>
            {`It can't be undone`}
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
            Cancel
          </Button>
          <Button variant='outlined' color='error' startIcon={<Icon icon='mdi:delete-outline' />}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default MeAccountSecurityDangerZoneCard
