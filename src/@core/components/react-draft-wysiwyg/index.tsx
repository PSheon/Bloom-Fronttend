// ** Next Import
import dynamic from 'next/dynamic'

// ** Third Party Components
import { ContentBlock } from 'draft-js'

// ** Types
import { EditorProps } from 'react-draft-wysiwyg'

export const initContentBlocks = {
  blocks: [
    new ContentBlock({
      key: 'secondary-title',
      text: '副標題',
      type: 'header-two'
    }),
    new ContentBlock({
      key: 'announcement-date',
      text: '公告日期：12/31',
      type: 'unstyled'
    }),
    new ContentBlock({
      key: 'announcement-content-01',
      text: '公告內容',
      type: 'unstyled'
    }),
    new ContentBlock({
      key: 'announcement-content-02',
      text: '例如，現在編輯器支援',
      type: 'unstyled'
    }),
    new ContentBlock({
      key: 'announcement-content-list-item-01',
      text: '編輯記錄：上一步、後一步',
      type: 'unordered-list-item'
    }),
    new ContentBlock({
      key: 'announcement-blank-01',
      text: '',
      type: 'unstyled'
    }),
    new ContentBlock({
      key: 'announcement-blank-02',
      text: '',
      type: 'unstyled'
    })
  ],
  entityMap: {}
}

// ! To avoid 'Window is not defined' error
const ReactDraftWysiwyg = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then(mod => mod.Editor), {
  ssr: false
})

export default ReactDraftWysiwyg
