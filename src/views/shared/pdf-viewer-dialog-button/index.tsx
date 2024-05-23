// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import DialogContent from '@mui/material/DialogContent'

// ** Third-Party Imports
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Util Imports
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import type { Ref, ReactElement } from 'react'
import type { FadeProps } from '@mui/material/Fade'

// ** Style Imports
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface Props {
  mediaAssetUrl: string
}

const PDFViewerDialogButton = (props: Props) => {
  // ** Props
  const { mediaAssetUrl } = props

  // ** States
  const [show, setShow] = useState<boolean>(false)

  // ** Hooks
  const { settings } = useSettings()

  // ** Vars
  const { mode } = settings
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  // ** Logics
  const handleOpen = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
      <Button
        color='primary'
        variant='outlined'
        startIcon={<Icon icon='mdi:magnify' fontSize={20} />}
        onClick={handleOpen}
      >
        <Typography whiteSpace='nowrap' color='inherit'>
          查看
        </Typography>
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
          查看 PDF
          <DialogContentText variant='body2' component='p' sx={{ textAlign: 'center' }}>
            點擊右上角的關閉按鈕或點擊背景以關閉
          </DialogContentText>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`],
            pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`]
          }}
        >
          <Box sx={{ height: '80vh' }}>
            <Viewer
              fileUrl={getPublicMediaAssetUrl(mediaAssetUrl)}
              plugins={[defaultLayoutPluginInstance]}
              theme={mode === 'dark' ? 'dark' : 'light'}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Worker>
  )
}

export default PDFViewerDialogButton
