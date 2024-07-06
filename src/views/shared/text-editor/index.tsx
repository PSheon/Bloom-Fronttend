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
    height: '100%',
    '& a': {
      color: `${theme.palette.primary.main} !important`
    }
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
  },
  '&.read-mode': {
    '& .bn-editor': {
      backgroundColor: theme.palette.background.default,
      paddingLeft: 0,
      paddingRight: 0,
      minHeight: theme.spacing(80)
    }
  }
}))

interface Props {
  blocks: Block[]
  mode: 'edit' | 'preview' | 'read'
  handleInitializeInstance?: (instance: BlockNoteEditor) => void
  handleChange?: () => void
}

const Editor = (props: Props) => {
  // ** Props
  const { blocks, mode, handleInitializeInstance, handleChange } = props

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
    <StyledBox className={`${mode}-mode`}>
      <BlockNoteView editor={editor} editable={mode === 'edit'} theme={theme.palette.mode} onChange={handleChange} />
    </StyledBox>
  )
}

export default Editor
