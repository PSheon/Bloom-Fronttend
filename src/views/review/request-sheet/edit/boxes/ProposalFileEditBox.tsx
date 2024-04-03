// ** MUI Imports
import { styled, darken } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Api Imports
import { useUpdateOneMutation } from 'src/store/api/management/requestSheet'

// ** Component Imports
import ProposalFileUploader from 'src/views/shared/proposal-file-uploader'
import MediaAssetEditPdfViewerDialogButton from 'src/views/shared/pdf-viewer-dialog-button'

// ** Types
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

// ** Styled Preview Box
const RootPreviewBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  position: 'relative',
  padding: theme.spacing(2),
  height: theme.spacing(64),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  background: darken(theme.palette.background.paper, 0.1),
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: 10
  }
}))

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const ProposalFileEditBox = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  // ** Hooks
  const [
    updateRequestSheet,
    { data: updatedRequestSheet = initRequestSheetEntity, isLoading: isUpdateRequestSheetLoading }
  ] = useUpdateOneMutation()

  //  ** Logics
  const handleUpdateProposalFile = async (fileId: number | null = null) => {
    await updateRequestSheet({
      id: initRequestSheetEntity.id,
      data: { proposalFile: fileId }
    })
  }

  if (isUpdateRequestSheetLoading) {
    return (
      <RootPreviewBox>
        <Skeleton variant='rounded' width='100%' height='100%' />
      </RootPreviewBox>
    )
  }

  if (updatedRequestSheet?.proposalFile?.data?.attributes.url) {
    return (
      <RootPreviewBox>
        <Icon icon='mdi:file-pdf-box' fontSize={40} />
        <Stack direction='row' spacing={6} sx={{ position: 'absolute', bottom: 20 }}>
          <Button variant='outlined' color='error' onClick={() => handleUpdateProposalFile(null)}>
            移除
          </Button>
          <MediaAssetEditPdfViewerDialogButton mediaAssetUrl={updatedRequestSheet.proposalFile.data.attributes.url} />
        </Stack>
      </RootPreviewBox>
    )
  }

  return (
    <RootPreviewBox>
      <Box sx={{ mb: 2 }}>
        <Icon icon='mdi:file-pdf-box' fontSize={48} />
      </Box>
      <Box>
        <ProposalFileUploader handleFinish={handleUpdateProposalFile} />
      </Box>
    </RootPreviewBox>
  )
}

export default ProposalFileEditBox
