// ** React Imports
import { useState, MouseEvent } from 'react'

// ** Next Imports
import dynamic from 'next/dynamic'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Card, { CardProps } from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import { OutputData } from '@editorjs/editorjs'
import { EditorCore } from 'src/views/shared/TextEditor'

// ** Custom Component Imports
const TextEditor = dynamic(() => import('src/views/shared/TextEditor'), { ssr: false })
import TextEditorPreview from 'src/views/shared/TextEditorPreview'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/fund'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'

interface Props {
  initFundEntity: FundType
}

// ** Styled Root Card component
const StyledRootCard = styled(Card)<CardProps>(({ theme }) => ({
  minHeight: theme.spacing(200)
}))

const ReviewFundEditDetailEditorCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** States
  const [blocks, setBlocks] = useState<OutputData | undefined>(initFundEntity.detail || undefined)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [editorInstance, setEditorInstance] = useState<EditorCore | null>(null)

  // ** Hooks
  const [updateFund, { isLoading: isUpdateFundLoading }] = useUpdateOneMutation()

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
    await updateFund({ id: initFundEntity.id, data: { detail: outputDetail } })
  }

  return (
    <StyledRootCard>
      <CardHeader
        title='細節說明'
        action={
          <Stack direction='row' spacing={4}>
            <Button variant='outlined' size='small' onClick={handleToggleEditorMode}>
              {isEditMode ? '預覽' : '編輯'}
            </Button>
            {isEditMode && (
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
        {isEditMode ? (
          <TextEditor blocks={blocks} handleInitializeInstance={handleInitializeInstance} />
        ) : (
          <TextEditorPreview blocks={blocks} />
        )}
      </CardContent>
    </StyledRootCard>
  )
}

export default ReviewFundEditDetailEditorCard
