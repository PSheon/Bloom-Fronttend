// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

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

// ** API Imports
import { useDeleteOneMutation } from 'src/store/api/management/mediaAsset'

// ** Type Imports
import type { MediaAssetType } from 'src/types/mediaAssetTypes'

interface Props {
  initMediaAssetEntity: MediaAssetType
}

const ManagementMediaAssetEditDeleteButton = (props: Props) => {
  // ** Props
  const { initMediaAssetEntity } = props

  // ** States
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  const router = useRouter()

  const [deleteOneMediaAssets, { data: deletedOneMediaAssets, isLoading: isDeleteOneMediaAssetsLoading }] =
    useDeleteOneMutation()

  // ** Logics
  const handleOpenDeleteDialog = () => setOpen(true)
  const handleCloseDeleteDialog = () => setOpen(false)

  const handleDeleteOneMediaAssetClick = async () => {
    await deleteOneMediaAssets(initMediaAssetEntity.id)
  }

  // ** Side Effects
  if (deletedOneMediaAssets) {
    router.push('/management/media-asset/list')
  }

  return (
    <Fragment>
      <Button fullWidth variant='outlined' color='error' onClick={handleOpenDeleteDialog}>
        刪除檔案
      </Button>

      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleCloseDeleteDialog}>
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
            <Typography>{initMediaAssetEntity.name}</Typography>
            <Typography>確認要刪除這個檔案嗎？</Typography>
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
              <Button variant='contained' onClick={handleCloseDeleteDialog}>
                取消
              </Button>
            </Grid>
            <Grid item>
              <LoadingButton
                loading={isDeleteOneMediaAssetsLoading}
                variant='outlined'
                color='error'
                onClick={handleDeleteOneMediaAssetClick}
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

export default ManagementMediaAssetEditDeleteButton
