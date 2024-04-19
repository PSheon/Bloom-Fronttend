// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Third-Party Imports
import { OutputData } from '@editorjs/editorjs'
import EditorPreview from 'editorjs-react-renderer'

// ** Styled Root Box component
const StyledRootBox = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: theme.spacing(64),
  '& img': {
    borderRadius: theme.shape.borderRadius
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
      <EditorPreview data={blocks} />
    </StyledRootBox>
  )
}

export default TextEditorPreview
