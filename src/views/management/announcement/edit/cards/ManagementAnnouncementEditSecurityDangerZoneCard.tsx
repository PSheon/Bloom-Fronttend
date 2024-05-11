// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

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
import LoadingButton from '@mui/lab/LoadingButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useDeleteOneMutation } from 'src/store/api/management/announcement'

// ** Type Imports
import type { AnnouncementType } from 'src/types/announcementTypes'

interface Props {
  initAnnouncementEntity: AnnouncementType
}

const ManagementAnnouncementEditSecurityDangerZoneCard = (props: Props) => {
  // ** Props
  const { initAnnouncementEntity } = props

  // ** States
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  const router = useRouter()

  const [deleteOneAnnouncement, { data: deletedOneAnnouncement, isLoading: isDeleteOneAnnouncementLoading }] =
    useDeleteOneMutation()

  // ** Logics
  const handleOpenDeleteAnnouncementDialog = () => setOpen(true)
  const handleCloseDeleteAnnouncementDialog = () => setOpen(false)

  const handleDeleteOneAnnouncementClick = async () => {
    await deleteOneAnnouncement(initAnnouncementEntity.id)
  }

  // ** Side Effects
  if (deletedOneAnnouncement) {
    router.push('/management/announcement/list')
  }

  return (
    <Fragment>
      <Card>
        <CardHeader title='危險區域' />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                刪除公告，將無法復原，所有修改記錄也將一併刪除
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant='outlined' color='error' type='submit' onClick={handleOpenDeleteAnnouncementDialog}>
                刪除公告
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleCloseDeleteAnnouncementDialog}>
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
            <Typography>確認要刪除公告？</Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'space-between',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' onClick={handleCloseDeleteAnnouncementDialog}>
            取消
          </Button>
          <LoadingButton
            loading={isDeleteOneAnnouncementLoading}
            variant='outlined'
            color='error'
            onClick={handleDeleteOneAnnouncementClick}
          >
            確認
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default ManagementAnnouncementEditSecurityDangerZoneCard
