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
import { useUpdateOneMutation } from 'src/store/api/management/article'

// ** Type Imports
import type { MouseEvent } from 'react'
import type { CardProps } from '@mui/material/Card'
import type { OutputData } from '@editorjs/editorjs'
import type { EditorCore } from 'src/views/shared/TextEditor'
import type { ArticleType } from 'src/types/articleTypes'

// ** Style Imports
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

interface Props {
  initArticleEntity: ArticleType
}

// ** Styled Root Card component
const StyledRootCard = styled(Card)<CardProps>(({ theme }) => ({
  minHeight: theme.spacing(160)
}))

const ManagementArticleEditOverviewContentEditorCard = (props: Props) => {
  // ** Props
  const { initArticleEntity } = props

  // ** States
  const [blocks, setBlocks] = useState<OutputData | undefined>(initArticleEntity.content || undefined)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [editorInstance, setEditorInstance] = useState<EditorCore | null>(null)

  // ** Hooks
  const [updateArticle, { isLoading: isUpdateArticleLoading }] = useUpdateOneMutation()

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
    await updateArticle({
      id: initArticleEntity.id,
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
                loading={isUpdateArticleLoading}
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

export default ManagementArticleEditOverviewContentEditorCard
