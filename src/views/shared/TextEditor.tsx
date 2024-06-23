// ** React Imports
import { useCallback, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Third-Party Imports
import axios from 'axios'
import toast from 'react-hot-toast'
import { createReactEditorJS } from 'react-editor-js'
import { useSession, getSession } from 'next-auth/react'

// @ts-ignore
import Paragraph from '@editorjs/paragraph'

// @ts-ignore
import CheckList from '@editorjs/checklist'

// @ts-ignore
import Delimiter from '@editorjs/delimiter'

// @ts-ignore
import Warning from '@editorjs/warning'

// @ts-ignore
import Embed from '@editorjs/embed'

// @ts-ignore
import Table from '@editorjs/table'

// @ts-ignore
import Image from '@editorjs/image'

// @ts-ignore
import Marker from '@editorjs/marker'

// @ts-ignore
import List from '@editorjs/list'

// @ts-ignore
import Quote from '@editorjs/quote'

// @ts-ignore
import Header from '@editorjs/header'

// @ts-ignore
import DragDrop from 'editorjs-drag-drop'

// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Util Imports
import { getAvatarFileInfo, getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import type { OutputData, EditorConfig } from '@editorjs/editorjs'

class EnhancedImage extends Image {
  async removed() {
    const session = await getSession()

    // @ts-ignore
    const { file } = this._data

    try {
      await axios.delete(`/api/upload/files/${file.mediaAssetId}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        }
      })
      toast.success('Image removed!')
    } catch (error) {
      toast.error('Remove image failed!')
    }
  }
}

class EnhancedEmbed extends Embed {
  static get toolbox() {
    return {
      title: 'YouTube',
      icon: `<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'><path fill='currentColor' d='m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73' /></svg>`
    }
  }

  render() {
    // @ts-ignore
    if (!this.data.service) {
      const container = document.createElement('div')

      // @ts-ignore
      this.element = container
      const input = document.createElement('input')

      input.classList.add('cdx-input')
      input.placeholder = 'https://www.youtube.com/watch?v=???'
      input.type = 'url'
      input.addEventListener('paste', event => {
        // @ts-ignore
        const url = event.clipboardData.getData('text')
        const service = Object.keys(Embed.services).find(key => Embed.services[key].regex.test(url))

        if (service) {
          // @ts-ignore
          this.onPaste({ detail: { key: service, data: url } })
        }
      })
      container.appendChild(input)

      return container
    }

    return super.render()
  }

  // @ts-ignore
  validate(savedData) {
    return savedData.service && savedData.source ? true : false
  }
}

export interface EditorCore {
  destroy(): Promise<void>
  clear(): Promise<void>
  save(): Promise<OutputData>
  render(data: OutputData): Promise<void>
  get dangerouslyLowLevelInstance(): any | null
}

interface Props {
  blocks: EditorConfig['data']
  handleInitializeInstance?: (instance: EditorCore) => void
}

const TextEditor = (props: Props) => {
  // ** Props
  const { blocks, handleInitializeInstance } = props

  // ** Refs
  const editorCore = useRef<EditorCore | null>(null)

  // ** Hooks
  const session = useSession()
  const { settings } = useSettings()

  // ** Vars
  const { mode } = settings
  const EditorJs = createReactEditorJS()

  const EDITOR_JS_TOOLS = {
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
      config: {
        preserveBlank: true
      }
    },
    embed: EnhancedEmbed,
    header: Header,
    list: List,
    warning: Warning,
    image: {
      class: EnhancedImage as Image,
      config: {
        uploader: {
          async uploadByFile(file: File) {
            const formData = new FormData()

            formData.append('files', file)
            formData.append('fileInfo', JSON.stringify(getAvatarFileInfo(file, session.data!.user!)))

            try {
              const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${session.data!.accessToken}`
                }
              })

              const mediaAssetId = res.data[0].id
              const url = res.data[0].url
              const imageUrl = getPublicMediaAssetUrl(url)

              toast.success('Image uploaded!')

              return {
                success: 1,
                file: {
                  mediaAssetId,
                  url: imageUrl
                }
              }
            } catch (error) {
              toast.error('Upload image failed!')
            }
          }
        }
      }
    },
    table: Table,
    marker: Marker,
    quote: Quote,
    checklist: CheckList,
    delimiter: Delimiter
  }

  // ** Side Effects
  const handleInitialize = useCallback(
    (instance: EditorCore) => {
      if (handleInitializeInstance !== undefined) {
        editorCore.current = instance
        handleInitializeInstance(instance)
      }
    },
    [handleInitializeInstance]
  )

  const handleReady = () => {
    // @ts-ignore
    const editorInstance = editorCore.current!._editorJS

    if (editorInstance) {
      new DragDrop(editorInstance)
    }
  }

  return (
    <EditorJs
      onInitialize={handleInitialize}
      onReady={handleReady}
      tools={EDITOR_JS_TOOLS}
      defaultValue={blocks}
      placeholder={`Write from here...`}
      holder='text-editor-box'
    >
      <Box
        id='text-editor-box'
        sx={{
          pt: theme => theme.spacing(12),
          ...(mode === 'dark' && {
            '& .codex-editor ::selection': {
              backgroundColor: theme => theme.palette.background.default
            },
            '& .cdx-block,& .ce-header,& .inlineToolButton,& .ce-inline-toolbar,& .ce-inline-tool,& .ce-conversion-toolbar,& .ce-toolbar__plus,& .ce-toolbar__settings-btn,& .ce-conversion-tool__icon':
              {
                backgroundColor: theme => theme.palette.background.paper,
                color: theme => theme.palette.text.primary
              },
            '& .ce-toolbar__plus:hover,& .ce-toolbar__settings-btn:hover,& .ce-inline-tool:hover,& .ce-inline-toolbar__dropdown:hover,& .cdx-loader,& .cdx-button,& .ce-popover__search,& .ce-conversion-tool:hover':
              {
                backgroundColor: '#262626',
                color: 'white'
              },
            '& .cdx-button:hover': {
              backgroundColor: '#2f2f2f'
            },
            '& .ce-popover,& .ce-popover-item,& .ce-popover-item__icon,& .ce-popover-items,& .ce-popover-item:hover,& .cdx-search-field__input':
              {
                backgroundColor: '#262626',
                color: 'white',
                border: 'none'
              }
          })
        }}
      />
    </EditorJs>
  )
}

export default TextEditor
