// ** MUI Imports
import { styled, darken } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Custom Component Imports
import MediaAssetEditPdfViewerDialogButton from 'src/views/shared/pdf-viewer-dialog-button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

// ** Styled Preview Box Component
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

const ProposalFilePreviewBox = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  if (initRequestSheetEntity?.proposalFile?.data?.attributes.url) {
    return (
      <RootPreviewBox>
        <Icon icon='mdi:file-pdf-box' fontSize={40} />
        <Stack direction='row' spacing={6} sx={{ position: 'absolute', bottom: 20 }}>
          <MediaAssetEditPdfViewerDialogButton
            mediaAssetUrl={initRequestSheetEntity.proposalFile.data.attributes.url}
          />
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
        <Typography variant='subtitle2'>未上傳計畫書</Typography>
      </Box>
    </RootPreviewBox>
  )
}

export default ProposalFilePreviewBox
