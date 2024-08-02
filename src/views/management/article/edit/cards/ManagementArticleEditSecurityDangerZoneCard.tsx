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
      <CardHeader title='Danger Zone' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography color='text.secondary' sx={{ fontWeight: 600 }}>
              Please be careful, once you delete the article, it cannot be undone, all modification records will be
              deleted as well
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant='outlined' color='error' type='submit' onClick={handleOpenDeleteArticleDialog}>
              Delete Article
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
          Are you sure you want to delete the article?
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
          <Button variant='contained' color='primary' onClick={handleCloseDeleteArticleDialog}>
            Cancel
          </Button>
          <LoadingButton
            loading={isDeleteOneArticleLoading}
            variant='outlined'
            color='error'
            startIcon={<Icon icon='mdi:delete-outline' />}
            onClick={handleDeleteOneArticleClick}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default ManagementArticleEditSecurityDangerZoneCard
