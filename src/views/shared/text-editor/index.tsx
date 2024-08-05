// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'

// ** Third-Party Imports
import { BlockNoteSchema, defaultBlockSpecs, filterSuggestionItems, insertOrUpdateBlock } from '@blocknote/core'
import { SuggestionMenuController, getDefaultReactSlashMenuItems, useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Imports
import AlertBlock from 'src/views/shared/text-editor/blocks/AlertBlock'

// ** Type Imports
import type { BoxProps } from '@mui/material'
import type { Block } from '@blocknote/core'

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

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: AlertBlock
  }
})

export type EditorType = typeof schema.BlockNoteEditor

interface Props {
  blocks: Block[]
  mode: 'edit' | 'preview' | 'read'
  handleInitializeInstance?: (instance: EditorType) => void
  handleChange?: () => void
}

const Editor = (props: Props) => {
  // ** Props
  const { blocks, mode, handleInitializeInstance, handleChange } = props

  // ** Hooks
  const theme = useTheme()

  const editor = useCreateBlockNote({
    schema,
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

  // ** Logics
  const insertAlert = (editor: EditorType) => ({
    title: 'Alert',
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: 'alert'
      })
    },
    aliases: ['alert', 'notification', 'emphasize', 'warning', 'error', 'info', 'success'],
    group: 'Other',
    icon: <Icon icon='mdi:alert-outline' fontSize={20} />
  })

  // ** Side Effects
  useEffect(() => {
    if (editor && handleInitializeInstance) {
      handleInitializeInstance(editor)
    }
  }, [handleInitializeInstance, editor])

  return (
    <StyledBox className={`${mode}-mode`}>
      <BlockNoteView
        editor={editor}
        slashMenu={false}
        editable={mode === 'edit'}
        theme={theme.palette.mode}
        onChange={handleChange}
      >
        <SuggestionMenuController
          triggerCharacter={'/'}
          getItems={async query =>
            filterSuggestionItems([...getDefaultReactSlashMenuItems(editor), insertAlert(editor)], query)
          }
        />
      </BlockNoteView>
    </StyledBox>
  )
}

export default Editor
