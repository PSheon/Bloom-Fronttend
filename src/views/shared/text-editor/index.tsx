// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'

// ** Third-Party Imports
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'

// ** Type Imports
import type { BoxProps } from '@mui/material'
import type { Block, BlockNoteEditor } from '@blocknote/core'

// ** Style Imports
import '@blocknote/mantine/style.css'

// ** Styled Components
const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  '& .bn-editor': {
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create('padding'),
    width: '100%',
    height: '100%'
  },
  '&.edit-mode': {
    '& .bn-editor': {
      minHeight: theme.spacing(120)
    }
  },
  '&.preview-mode': {
    '& .bn-editor': {
      paddingLeft: 0,
      paddingRight: 0,
      minHeight: theme.spacing(80)
    }
  }
}))

interface Props {
  blocks: Block[]
  editMode: boolean
  handleInitializeInstance?: (instance: BlockNoteEditor) => void
  handleChange?: () => void
}

const Editor = (props: Props) => {
  // ** Props
  const { blocks, editMode, handleInitializeInstance, handleChange } = props

  // ** Hooks
  const theme = useTheme()

  const editor = useCreateBlockNote({
    initialContent: blocks ?? [
      {
        type: 'heading',
        content: 'Add fund title here'
      },
      {
        type: 'paragraph',
        content: 'Add fund details here'
      },
      {
        type: 'paragraph',
        content: "Type '/' to insert a block"
      }
    ]
  })

  // ** Side Effects
  useEffect(() => {
    if (editor && handleInitializeInstance) {
      handleInitializeInstance(editor)
    }
  }, [handleInitializeInstance, editor])

  return (
    <StyledBox className={editMode ? 'edit-mode' : 'preview-mode'}>
      <BlockNoteView editor={editor} editable={editMode} theme={theme.palette.mode} onChange={handleChange} />
    </StyledBox>
  )
}

export default Editor
