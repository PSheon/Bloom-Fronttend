// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

// ** Third-Party Imports
import EditorPreview from 'editorjs-react-renderer'

// ** Type Imports
import type { BoxProps } from '@mui/material/Box'
import type { OutputData } from '@editorjs/editorjs'

// ** Styled Root Box component
const StyledRootBox = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: theme.spacing(8),
  '& figure': {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `${theme.palette.background.default} !important`,
    '& img': {
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius
    },
    '& figcaption': {
      backgroundColor: `${theme.palette.background.paper} !important`
    }
  }
}))

interface Props {
  blocks: OutputData | undefined
}

const TextEditorPreview = (props: Props) => {
  // ** Props
  const { blocks } = props

  return (
    <StyledRootBox>
      <EditorPreview data={blocks as OutputData} />
    </StyledRootBox>
  )
}

export default TextEditorPreview
