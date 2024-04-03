// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'

// ** Types
import { AnnouncementType } from 'src/types/api/announcementTypes'

// ** Api Imports
import { useUpdateOneMutation } from 'src/store/api/management/announcement'

// ** Styled Component
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

// ** Styled Component Imports
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

interface Props {
  initAnnouncementEntity: AnnouncementType
}

const AnnouncementEditContentEditorCard = (props: Props) => {
  // ** Props
  const { initAnnouncementEntity } = props

  // ** State
  const [content, setContent] = useState(EditorState.createWithContent(convertFromRaw(initAnnouncementEntity.content)))
  const [isContentDirty, setIsContentDirty] = useState<boolean>(false)

  // ** Hooks
  const [
    updateAnnouncement,
    { data: updatedAnnouncement = initAnnouncementEntity, isLoading: isUpdateAnnouncementLoading }
  ] = useUpdateOneMutation()

  // ** Logics
  const handleSaveClick = async () => {
    await updateAnnouncement({
      id: initAnnouncementEntity.id,
      data: { content: convertToRaw(content.getCurrentContent()) }
    })
    setIsContentDirty(false)
  }
  const handlePublishClick = async () => {
    await updateAnnouncement({
      id: initAnnouncementEntity.id,
      data: { isPublished: !updatedAnnouncement.isPublished }
    })
  }

  return (
    <Card>
      <CardHeader
        title='編輯內文'
        action={
          <Stack direction='row' spacing={4}>
            <LoadingButton
              size='small'
              onClick={handleSaveClick}
              loading={isUpdateAnnouncementLoading}
              disabled={!isContentDirty}
              variant='contained'
              endIcon={<Icon icon='mdi:content-save-outline' />}
            >
              儲存
            </LoadingButton>
            <LoadingButton
              size='small'
              onClick={handlePublishClick}
              loading={isUpdateAnnouncementLoading}
              color={updatedAnnouncement.isPublished ? 'secondary' : 'primary'}
              variant={updatedAnnouncement.isPublished ? 'outlined' : 'contained'}
            >
              {updatedAnnouncement.isPublished ? '取消發布' : '發布'}
            </LoadingButton>
          </Stack>
        }
      />
      <CardContent>
        <EditorWrapper>
          <ReactDraftWysiwyg
            editorState={content}
            onEditorStateChange={content => {
              setContent(content)
              setIsContentDirty(true)
            }}
            toolbar={{
              options: [
                'history',
                'blockType',
                'inline',
                'colorPicker',
                'link',
                'textAlign',
                'list',
                'image',
                'remove'
              ],
              inline: {
                inDropdown: false,
                options: ['bold']
              },
              blockType: {
                inDropdown: true,
                options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']
              },
              textAlign: {
                inDropdown: true
              }
            }}
            localization={{
              locale: 'zh_tw'
            }}
          />
        </EditorWrapper>
      </CardContent>
    </Card>
  )
}

export default AnnouncementEditContentEditorCard
