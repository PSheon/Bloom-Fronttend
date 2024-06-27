// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import CardContent from '@mui/material/CardContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ManagementFundEditSecurityDangerZoneCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** States
  const [open, setOpen] = useState<boolean>(false)

  // ** Logics
  const handleOpenArchiveFundDialog = () => setOpen(true)
  const handleCloseArchiveFundDialog = () => setOpen(false)

  return (
    <Card>
      <CardHeader title='Danger Zone' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography color='text.secondary' sx={{ fontWeight: 600 }}>
              Please note! Once you archive this fund, the fund will no longer be able to collect application data and
              cannot be recovered
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button disabled variant='outlined' color='error' type='submit' onClick={handleOpenArchiveFundDialog}>
              Archive
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleCloseArchiveFundDialog}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          {`Are you sure you want to archive the fund ${initFundEntity.displayName}?`}
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
          <Button variant='outlined' color='primary' onClick={handleCloseArchiveFundDialog}>
            Cancel
          </Button>
          <Button disabled variant='contained' color='error' startIcon={<Icon icon='mdi:delete-outline' />}>
            Archive
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default ManagementFundEditSecurityDangerZoneCard
