// ** React Imports
import { Ref, useState, forwardRef, ReactElement, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Component
import MediaAssetSelectorList from 'src/views/shared/media-asset-selector/list'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface Props {
  handleFinish: (fileId: number) => Promise<void>
}

const MediaAssetSelector = (props: Props) => {
  // ** Props
  const { handleFinish } = props

  // ** States
  const [show, setShow] = useState<boolean>(false)
  const [selectedMediaAssetId, setSelectedMediaAssetId] = useState<number | null>(null)

  // ** Logics
  const handleOpen = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleSelectMediaAsset = (newSelectedMediaAssetId: number) => {
    setSelectedMediaAssetId(newSelectedMediaAssetId)
  }

  return (
    <Fragment>
      <Button color='primary' variant='contained' onClick={handleOpen}>
        選擇檔案
      </Button>

      <Dialog fullWidth open={show} maxWidth='lg' scroll='body' onClose={handleClose} TransitionComponent={Transition}>
        <DialogContent
          sx={{
            position: 'relative',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              選擇檔案
            </Typography>
            <Typography variant='body2'>選擇圖片或者檔案</Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <MediaAssetSelectorList handleSelect={handleSelectMediaAsset} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Grid container spacing={6} justifyContent='space-between'>
            <Grid item>
              <Button variant='outlined' color='secondary' onClick={handleClose}>
                取消
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={!selectedMediaAssetId}
                onClick={() => {
                  handleFinish(selectedMediaAssetId!)
                }}
                variant='contained'
              >
                選擇
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default MediaAssetSelector
