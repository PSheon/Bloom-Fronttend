// ** React Imports
import { useState, forwardRef, Fragment } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Fade from '@mui/material/Fade'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Custom Component Imports
import MediaAssetSelectorList from 'src/views/shared/media-asset-selector/list'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { Ref, ReactElement } from 'react'
import type { FadeProps } from '@mui/material/Fade'

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

      <Dialog
        open={show}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800, position: 'relative' } }}
      >
        <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>

        <DialogTitle
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          選擇檔案
          <DialogContentText variant='body2' component='p' sx={{ textAlign: 'center' }}>
            選擇圖片或者檔案
          </DialogContentText>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`],
            pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`]
          }}
        >
          <MediaAssetSelectorList handleSelect={handleSelectMediaAsset} />
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'space-between',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(4)} !important`],
            pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(7.5)} !important`]
          }}
        >
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            取消
          </Button>
          <Button
            disabled={!selectedMediaAssetId}
            onClick={() => {
              handleFinish(selectedMediaAssetId!)
            }}
            variant='contained'
          >
            選擇
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default MediaAssetSelector
