// ** React Imports
import { useState } from 'react'

// ** Next Imports
import dynamic from 'next/dynamic'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Custom Component Imports
const TextEditor = dynamic(() => import('src/views/shared/TextEditor'), { ssr: false })

import TextEditorPreview from 'src/views/shared/TextEditorPreview'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/announcement'

// ** Type Imports
import type { MouseEvent } from 'react'
import type { CardProps } from '@mui/material/Card'
import type { OutputData } from '@editorjs/editorjs'
import type { EditorCore } from 'src/views/shared/TextEditor'
import type { AnnouncementType } from 'src/types/api/announcementTypes'

// ** Style Imports
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

interface Props {
  initAnnouncementEntity: AnnouncementType
}

// ** Styled Root Card component
const StyledRootCard = styled(Card)<CardProps>(({ theme }) => ({
  minHeight: theme.spacing(160)
}))

const ManagementAnnouncementEditOverviewContentEditorCard = (props: Props) => {
  // ** Props
  const { initAnnouncementEntity } = props

  // ** States
  const [blocks, setBlocks] = useState<OutputData | undefined>(initAnnouncementEntity.content || undefined)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [editorInstance, setEditorInstance] = useState<EditorCore | null>(null)

  // ** Hooks
  const [updateAnnouncement, { isLoading: isUpdateAnnouncementLoading }] = useUpdateOneMutation()

  // ** Logics
  const handleInitializeInstance = (instance: EditorCore) => {
    setEditorInstance(instance)
  }

  const handleToggleEditorMode = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()

    if (isEditMode) {
      const savedBlocks = await editorInstance!.save()

      setBlocks(() => savedBlocks)
      setIsEditMode(() => false)
    } else {
      setIsEditMode(() => true)
    }
  }

  const handleSaveClick = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const outputDetail = await editorInstance!.save()

    setBlocks(() => outputDetail)
    await updateAnnouncement({
      id: initAnnouncementEntity.id,
      data: { content: outputDetail }
    })
  }

  return (
    <StyledRootCard>
      <CardHeader
        title='內容'
        action={
          <Stack direction='row' spacing={4}>
            <Button variant='outlined' size='small' onClick={handleToggleEditorMode}>
              {isEditMode ? '預覽' : '編輯'}
            </Button>
            {isEditMode && (
              <LoadingButton
                onClick={handleSaveClick}
                disabled={editorInstance === null}
                loading={isUpdateAnnouncementLoading}
                startIcon={<Icon icon='mdi:content-save-outline' />}
                variant='contained'
                size='small'
              >
                儲存
              </LoadingButton>
            )}
          </Stack>
        }
      />
      <CardContent>
        {isEditMode ? (
          <TextEditor blocks={blocks} handleInitializeInstance={handleInitializeInstance} />
        ) : (
          <TextEditorPreview blocks={blocks} />
        )}
      </CardContent>
    </StyledRootCard>
  )
}

export default ManagementAnnouncementEditOverviewContentEditorCard
