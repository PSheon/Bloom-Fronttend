// ** React Imports
import { useState, forwardRef, Fragment } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
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
import { getAvatarFileInfo } from 'src/utils'

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
interface Props {
  handleFinish: (fileId: number) => Promise<void>
}

const AvatarUploader = (props: Props) => {
  // ** Props
  const { handleFinish } = props

  // ** States
  const [show, setShow] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])

  // ** Hooks
  const session = useSession()

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 20_000_000,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
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
    formData.append('fileInfo', JSON.stringify(getAvatarFileInfo(files[0], session.data!.user!)))

    uploadMediaAssets(formData)
  }

  // ** Side Effects
  if (uploadedMediaAssets) {
    handleFinish(uploadedMediaAssets[0].id)
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
        上傳頭像
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
          id='user-view-edit'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          上傳頭像
          <DialogContentText id='user-view-edit-description' variant='body2' component='p' sx={{ textAlign: 'center' }}>
            更新個人資料詳細資訊將接受隱私審核
          </DialogContentText>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`],
            pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`]
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <DropzoneWrapper>
                <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 200 } : {}}>
                  <input {...getInputProps()} />
                  {files.length ? (
                    files.map((file: FileProp) => (
                      <Fragment key={file.name}>
                        <img alt={file.name} className='avatar-file-image' src={URL.createObjectURL(file as any)} />
                        <Box sx={{ position: 'absolute', bottom: 20 }}>
                          <Button
                            variant='contained'
                            color='error'
                            size='small'
                            startIcon={<Icon icon='mdi:delete-outline' />}
                            onClick={handleRemoveFiles}
                          >
                            移除頭像
                          </Button>
                        </Box>
                        <Box sx={{ position: 'absolute', right: 20, bottom: 20 }}>
                          <Chip label={file.type} />
                        </Box>
                      </Fragment>
                    ))
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                      <Typography
                        variant='h5'
                        color='text.primary'
                        sx={{ mb: 5, '& a': { color: 'primary.main', textDecoration: 'none' } }}
                      >
                        將圖片拖放到此處或{' '}
                        <Link href='/' onClick={e => e.preventDefault()}>
                          點擊瀏覽
                        </Link>{' '}
                        您的文件夾
                      </Typography>
                      <Typography color='textSecondary'>支援JPG、PNG</Typography>
                      <Typography color='textSecondary'>每個圖片大小限制為20MB</Typography>
                    </Box>
                  )}
                </Box>
              </DropzoneWrapper>
            </Grid>
          </Grid>
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
            上傳頭像
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default AvatarUploader
