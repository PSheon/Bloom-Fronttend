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
import { useUpdateOneMutation } from 'src/store/api/management/fund'

// ** Type Imports
import type { MouseEvent } from 'react'
import type { Block } from '@blocknote/core'
import type { EditorType } from 'src/views/shared/text-editor'
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ManagementFundEditDetailEditorCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** States
  const [editorInstance, setEditorInstance] = useState<EditorType | null>(null)
  const [editorMode, setEditorMode] = useState<'edit' | 'preview'>('preview')
  const [blocks, setBlocks] = useState<Block[]>(initFundEntity.detail)

  // ** Hooks
  const [updateFund, { isLoading: isUpdateFundLoading }] = useUpdateOneMutation()

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

  const handleSaveBlocks = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const blocks = editorInstance?.document as Block[]

    setBlocks(() => blocks)
    await updateFund({ id: initFundEntity.id, data: { detail: blocks } })
  }

  return (
    <Card>
      <CardHeader
        title='細節說明'
        action={
          <Stack direction='row' spacing={4}>
            <Button variant='outlined' size='small' onClick={handleToggleEditorMode}>
              {editorMode === 'edit' ? '預覽' : '編輯'}
            </Button>
            {editorMode === 'edit' && (
              <LoadingButton
                loading={isUpdateFundLoading}
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
        <TextEditor blocks={blocks} handleInitializeInstance={handleInitializeInstance} mode={editorMode} />
      </CardContent>
    </Card>
  )
}

export default ManagementFundEditDetailEditorCard
