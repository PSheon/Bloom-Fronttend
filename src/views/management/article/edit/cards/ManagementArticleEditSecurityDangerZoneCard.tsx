// ** React Imports
import { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

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
import LoadingButton from '@mui/lab/LoadingButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useDeleteOneMutation } from 'src/store/api/management/article'

// ** Type Imports
import type { ArticleType } from 'src/types/articleTypes'

interface Props {
  initArticleEntity: ArticleType
}

const ManagementArticleEditSecurityDangerZoneCard = (props: Props) => {
  // ** Props
  const { initArticleEntity } = props

  // ** States
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  const router = useRouter()

  const [deleteOneArticle, { data: deletedOneArticle, isLoading: isDeleteOneArticleLoading }] = useDeleteOneMutation()

  // ** Logics
  const handleOpenDeleteArticleDialog = () => setOpen(true)
  const handleCloseDeleteArticleDialog = () => setOpen(false)

  const handleDeleteOneArticleClick = async () => {
    await deleteOneArticle(initArticleEntity.id)
  }

  // ** Side Effects
  if (deletedOneArticle) {
    router.push('/management/article/list')
  }

  return (
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
            <Button variant='outlined' color='error' type='submit' onClick={handleOpenDeleteArticleDialog}>
              刪除公告
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleCloseDeleteArticleDialog}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          確認要刪除公告？
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
          <Button variant='contained' color='secondary' onClick={handleCloseDeleteArticleDialog}>
            取消
          </Button>
          <LoadingButton
            loading={isDeleteOneArticleLoading}
            variant='outlined'
            color='error'
            startIcon={<Icon icon='mdi:delete-outline' />}
            onClick={handleDeleteOneArticleClick}
          >
            確認
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default ManagementArticleEditSecurityDangerZoneCard
