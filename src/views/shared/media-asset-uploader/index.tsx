// ** React Imports
import { useState, forwardRef, Fragment } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import { useDropzone } from 'react-dropzone'
import { useSession } from 'next-auth/react'

// ** Core Component Imports
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUploadMutation } from 'src/store/api/management/mediaAsset'

// ** Util Imports
import { getMediaAssetFileInfo } from 'src/utils'

// ** Type Imports
import type { Ref, ReactElement, MouseEvent } from 'react'
import type { FadeProps } from '@mui/material/Fade'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface FileProp {
  name: string
  type: string
  size: number
}

const MediaAssetUploader = () => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])

  // ** Hooks
  const session = useSession()

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 20_000_000,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const [
    uploadMediaAssets,
    { data: uploadedMediaAssets, isLoading: isUploadMediaAssetsLoading, reset: resetMediaAssetsState }
  ] = useUploadMutation()

  // ** Logics
  const handleOpen = () => {
    setShow(true)
  }

  const handleClose = () => {
    setFiles([])
    resetMediaAssetsState()
    setShow(false)
  }

  const handleRemoveFiles = (e: MouseEvent) => {
    e.stopPropagation()
    setFiles([])
  }

  const handleUploadClick = async () => {
    const formData = new FormData()

    formData.append('files', files[0])
    formData.append('fileInfo', JSON.stringify(getMediaAssetFileInfo(files[0], session.data!.user!)))

    uploadMediaAssets(formData)
  }

  // ** Side Effects
  if (uploadedMediaAssets) {
    handleClose()
  }

  return (
    <Fragment>
      <Button
        color='primary'
        variant='contained'
        startIcon={<Icon icon='mdi:upload-outline' fontSize={20} />}
        onClick={handleOpen}
      >
        <Typography whiteSpace='nowrap' color='inherit'>
          Upload
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
          Upload Media Asset
          <DialogContentText variant='body2' component='p' sx={{ textAlign: 'center' }}>
            Upload an image or file
          </DialogContentText>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`],
            pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`]
          }}
        >
          <DropzoneWrapper>
            <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 200 } : {}}>
              <input {...getInputProps()} />
              {files.length ? (
                files.map((file: FileProp) => {
                  const isImage = /(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(file.type)

                  return (
                    <Fragment key={file.name}>
                      {isImage ? (
                        <img alt={file.name} className='single-file-image' src={URL.createObjectURL(file as any)} />
                      ) : (
                        <Stack spacing={2} alignItems='center' sx={{ maxWidth: '20ch' }}>
                          <Icon icon='mdi:file' fontSize={40} />
                          <Typography variant='caption' noWrap sx={{ width: '100%', fontWeight: 600 }}>
                            {file.name}
                          </Typography>
                        </Stack>
                      )}
                      <Box sx={{ position: 'absolute', bottom: 20 }}>
                        <Button
                          variant='contained'
                          color='error'
                          size='small'
                          startIcon={<Icon icon='mdi:delete-outline' />}
                          onClick={handleRemoveFiles}
                        >
                          Remove
                        </Button>
                      </Box>
                      <Box sx={{ position: 'absolute', right: 20, bottom: 20 }}>
                        <Chip label={file.type} />
                      </Box>
                    </Fragment>
                  )
                })
              ) : (
                <Stack textAlign='center'>
                  <Typography
                    variant='h5'
                    component='p'
                    color='text.primary'
                    sx={{ mb: 5, '& a': { color: 'primary.main', textDecoration: 'none' } }}
                  >
                    Drag and drop an file here
                    <br />
                    or
                    <br />
                    <Link href='/' onClick={e => e.preventDefault()}>
                      Click to browse
                    </Link>{' '}
                    Click to browse
                  </Typography>
                  <Typography color='text.secondary'>Accept JPG/PNG/PDF/Word/PPT</Typography>
                  <Typography color='text.secondary'>Each file size should be less than 20MB</Typography>
                </Stack>
              )}
            </Box>
          </DropzoneWrapper>
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
          <LoadingButton
            loading={isUploadMediaAssetsLoading}
            disabled={files.length === 0}
            variant='contained'
            startIcon={<Icon icon='mdi:cloud-upload-outline' />}
            onClick={handleUploadClick}
          >
            上傳
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default MediaAssetUploader
