// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { FundType } from 'src/types/api/fundTypes'

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
            <Typography>{`確認要封存 ${initFundEntity.displayName}？`}</Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }}>
            確認
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleCloseArchiveFundDialog}>
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default ManagementFundEditSecurityDangerZoneCard
