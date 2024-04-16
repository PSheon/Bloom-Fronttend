// ** React Imports
import { useState } from 'react'

// ** Third-Party Imports
import { EditorState } from 'draft-js'

// ** Core Component Imports
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

const EditorControlled = () => {
  // ** States
  const [value, setValue] = useState(EditorState.createEmpty())

  return <ReactDraftWysiwyg editorState={value} onEditorStateChange={data => setValue(data)} />
}

export default EditorControlled
