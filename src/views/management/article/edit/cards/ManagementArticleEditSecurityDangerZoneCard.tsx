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
              <Button variant='outlined' color='error' type='submit' onClick={handleOpenDeleteArticleDialog}>
                刪除公告
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleCloseDeleteArticleDialog}>
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
          <Button variant='contained' onClick={handleCloseDeleteArticleDialog}>
            取消
          </Button>
          <LoadingButton
            loading={isDeleteOneArticleLoading}
            variant='outlined'
            color='error'
            onClick={handleDeleteOneArticleClick}
          >
            確認
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default ManagementArticleEditSecurityDangerZoneCard
