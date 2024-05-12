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
const TextEditorPreview = dynamic(() => import('src/views/shared/TextEditorPreview'), { ssr: false })

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/notification'

// ** Type Imports
import type { MouseEvent } from 'react'
import type { CardProps } from '@mui/material/Card'
import type { OutputData } from '@editorjs/editorjs'
import type { EditorCore } from 'src/views/shared/TextEditor'
import type { NotificationType } from 'src/types/notificationTypes'

interface Props {
  initNotificationEntity: NotificationType
}

// ** Styled Root Card component
const StyledRootCard = styled(Card)<CardProps>(({ theme }) => ({
  minHeight: theme.spacing(160)
}))

const ManagementNotificationEditOverviewContentEditorCard = (props: Props) => {
  // ** Props
  const { initNotificationEntity } = props

  // ** States
  const [blocks, setBlocks] = useState<OutputData | undefined>(initNotificationEntity.content || undefined)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [editorInstance, setEditorInstance] = useState<EditorCore | null>(null)

  // ** Hooks
  const [updateNotification, { isLoading: isUpdateNotificationLoading }] = useUpdateOneMutation()

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

  const handleSaveBlocks = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const outputDetail = await editorInstance!.save()

    setBlocks(() => outputDetail)
    await updateNotification({ id: initNotificationEntity.id, data: { content: outputDetail } })
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
        {isEditMode ? (
          <TextEditor blocks={blocks} handleInitializeInstance={handleInitializeInstance} />
        ) : (
          <TextEditorPreview blocks={blocks} />
        )}
      </CardContent>
    </StyledRootCard>
  )
}

export default ManagementNotificationEditOverviewContentEditorCard
