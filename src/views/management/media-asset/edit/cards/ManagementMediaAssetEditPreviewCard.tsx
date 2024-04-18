// ** MUI Imports
import { styled, darken } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

// ** Custom Component Imports
import MediaAssetEditPdfViewerDialogButton from 'src/views/shared/pdf-viewer-dialog-button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getMediaAssetFileAttributes, getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import { MediaAssetType } from 'src/types/api/mediaAssetTypes'

// ** Styled Preview Box Component
const RootPreviewBox = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  width: '100%',
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
    objectFit: 'contain'
  }
}))

interface Props {
  initMediaAssetEntity: MediaAssetType
}

const ManagementMediaAssetEditPreviewCard = (props: Props) => {
  // ** Props
  const { initMediaAssetEntity } = props

  // ** Vars
  const mediaAssetFileAttributes = getMediaAssetFileAttributes(initMediaAssetEntity)

  return (
    <Card>
      <CardHeader title='預覽' />
      <CardContent>
        <RootPreviewBox>
          {mediaAssetFileAttributes.isImage && (
            <img
              alt={initMediaAssetEntity.name}
              src={getPublicMediaAssetUrl(initMediaAssetEntity.formats?.thumbnail?.url)}
            />
          )}
          {mediaAssetFileAttributes.isPdf && (
            <Box>
              <Icon icon='mdi:file' fontSize={40} />
              <Stack
                direction='row'
                justifyContent='center'
                sx={{ position: 'absolute', left: 0, bottom: 0, width: '100%', p: 4 }}
              >
                <MediaAssetEditPdfViewerDialogButton mediaAssetUrl={initMediaAssetEntity.url} />
              </Stack>
            </Box>
          )}
          {!mediaAssetFileAttributes.isImage && !mediaAssetFileAttributes.isPdf && (
            <Icon icon='mdi:file' fontSize={40} />
          )}
        </RootPreviewBox>
      </CardContent>
    </Card>
  )
}

export default ManagementMediaAssetEditPreviewCard
