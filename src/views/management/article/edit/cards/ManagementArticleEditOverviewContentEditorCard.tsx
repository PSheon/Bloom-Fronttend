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
import { useUpdateOneMutation } from 'src/store/api/management/article'

// ** Type Imports
import type { MouseEvent } from 'react'
import type { Block } from '@blocknote/core'
import type { EditorType } from 'src/views/shared/text-editor'
import type { ArticleType } from 'src/types/articleTypes'

// ** Style Imports
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

interface Props {
  initArticleEntity: ArticleType
}

const ManagementArticleEditOverviewContentEditorCard = (props: Props) => {
  // ** Props
  const { initArticleEntity } = props

  // ** States
  const [editorInstance, setEditorInstance] = useState<EditorType | null>(null)
  const [editorMode, setEditorMode] = useState<'edit' | 'preview'>('preview')
  const [blocks, setBlocks] = useState<Block[]>(initArticleEntity.content)

  // ** Hooks
  const [updateArticle, { isLoading: isUpdateArticleLoading }] = useUpdateOneMutation()

  // ** Logics
  const handleInitializeInstance = (instance: EditorType) => {
    setEditorInstance(instance)
  }

  const handleToggleEditorMode = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()

    if (editorMode === 'edit') {
      const blocks = editorInstance?.document as Block[]

      setBlocks(() => blocks)
      setEditorMode(() => 'preview')
    } else {
      setEditorMode(() => 'edit')
    }
  }

  const handleSaveClick = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const blocks = editorInstance?.document as Block[]

    setBlocks(() => blocks)
    await updateArticle({
      id: initArticleEntity.id,
      data: { content: blocks }
    })
  }

  return (
    <Card>
      <CardHeader
        title='內容'
        action={
          <Stack direction='row' spacing={4}>
            <Button variant='outlined' size='small' onClick={handleToggleEditorMode}>
              {editorMode === 'edit' ? '預覽' : '編輯'}
            </Button>
            {editorMode === 'edit' && (
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
        <TextEditor blocks={blocks} handleInitializeInstance={handleInitializeInstance} mode={editorMode} />
      </CardContent>
    </Card>
  )
}

export default ManagementArticleEditOverviewContentEditorCard
