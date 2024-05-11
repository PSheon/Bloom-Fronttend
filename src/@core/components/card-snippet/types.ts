// ** Type Imports
import type { ReactNode, ReactElement } from 'react'
import type { CardProps } from '@mui/material/Card'

export type CardSnippetProps = CardProps & {
  id?: string
  title: string
  children: ReactNode
  code: {
    tsx: ReactElement | null
    jsx: ReactElement | null
  }
  className?: string
}
