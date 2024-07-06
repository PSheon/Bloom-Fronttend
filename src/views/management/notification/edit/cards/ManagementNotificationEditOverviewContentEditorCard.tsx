// ** React Imports
import { useState } from 'react'

// ** Next Imports
import dynamic from 'next/dynamic'

// ** MUI Imports
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Custom Component Imports
const TextEditor = dynamic(() => import('src/views/shared/text-editor'), { ssr: false })

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/notification'

// ** Type Imports
import type { MouseEvent } from 'react'
import type { BlockNoteEditor, Block } from '@blocknote/core'
import type { NotificationType } from 'src/types/notificationTypes'

interface Props {
  initNotificationEntity: NotificationType
}

const ManagementNotificationEditOverviewContentEditorCard = (props: Props) => {
  // ** Props
  const { initNotificationEntity } = props

  // ** States
  const [editorInstance, setEditorInstance] = useState<BlockNoteEditor | null>(null)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [blocks, setBlocks] = useState<Block[]>(initNotificationEntity.content)

  // ** Hooks
  const [updateNotification, { isLoading: isUpdateNotificationLoading }] = useUpdateOneMutation()

  // ** Logics
  const handleInitializeInstance = (instance: BlockNoteEditor) => {
    setEditorInstance(instance)
  }

  const handleToggleEditorMode = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()

    if (isEditMode) {
      const blocks = editorInstance?.document as Block[]

      setBlocks(() => blocks)
      setIsEditMode(() => false)
    } else {
      setIsEditMode(() => true)
    }
  }

  const handleSaveBlocks = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const blocks = editorInstance?.document as Block[]

    setBlocks(() => blocks)
    await updateNotification({ id: initNotificationEntity.id, data: { content: blocks } })
  }

  return (
    <Card>
      <CardHeader
        title='內容'
        action={
          <Stack direction='row' spacing={4}>
            <Button variant='outlined' size='small' onClick={handleToggleEditorMode}>
              {isEditMode ? '預覽' : '編輯'}
            </Button>
            {isEditMode && (
              <LoadingButton
                loading={isUpdateNotificationLoading}
                disabled={editorInstance === null}
                startIcon={<Icon icon='mdi:content-save-outline' />}
                variant='contained'
                size='small'
                onClick={handleSaveBlocks}
              >
                儲存
              </LoadingButton>
            )}
          </Stack>
        }
      />
      <CardContent>
        <TextEditor blocks={blocks} handleInitializeInstance={handleInitializeInstance} editMode={isEditMode} />
      </CardContent>
    </Card>
  )
}

export default ManagementNotificationEditOverviewContentEditorCard
