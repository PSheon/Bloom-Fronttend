// ** React Imports
import { Ref, useState, forwardRef, ReactElement, Fragment, MouseEvent } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Api Imports
import { useUploadMutation } from 'src/store/api/management/mediaAsset'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

// ** Utils Imports
import { getProposalFileInfo } from 'src/utils'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

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

const ProposalFileUploader = (props: Props) => {
  // ** Props
  const { handleFinish } = props

  // ** States
  const [show, setShow] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])

  // ** Hooks
  const auth = useAuth()
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 50_000_000,
    accept: {
      'application/pdf': ['.pdf']
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
    formData.append('fileInfo', JSON.stringify(getProposalFileInfo(files[0], auth.user!)))

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
        上傳計畫書
      </Button>

      <Dialog fullWidth open={show} maxWidth='md' scroll='body' onClose={handleClose} TransitionComponent={Transition}>
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
              上傳計畫書
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <DropzoneWrapper>
                <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 200 } : {}}>
                  <input {...getInputProps()} />
                  {files.length ? (
                    files.map((file: FileProp) => (
                      <Fragment key={file.name}>
                        <Stack spacing={2} alignItems='center' sx={{ maxWidth: '20ch' }}>
                          <Icon icon='mdi:file-pdf-box' fontSize={40} />
                          <Typography variant='caption' noWrap sx={{ width: '100%', fontWeight: 600 }}>
                            {file.name}
                          </Typography>
                        </Stack>
                        <Box sx={{ position: 'absolute', bottom: 20 }}>
                          <Button
                            variant='contained'
                            color='error'
                            size='small'
                            startIcon={<Icon icon='mdi:delete-outline' />}
                            onClick={handleRemoveFiles}
                          >
                            移除
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
                        將計畫書拖放到此處或{' '}
                        <Link href='/' onClick={e => e.preventDefault()}>
                          點擊瀏覽
                        </Link>{' '}
                        您的文件夾
                      </Typography>
                      <Typography color='textSecondary'>僅支援PDF</Typography>
                      <Typography color='textSecondary'>大小限制為50MB</Typography>
                    </Box>
                  )}
                </Box>
              </DropzoneWrapper>
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
              <LoadingButton
                loading={isUploadMediaAssetsLoading}
                disabled={files.length === 0}
                onClick={handleUploadClick}
                variant='contained'
              >
                上傳
              </LoadingButton>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default ProposalFileUploader
