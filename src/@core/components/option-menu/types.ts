// ** Type Imports
import type { ReactNode } from 'react'
import type { MenuProps } from '@mui/material/Menu'
import type { DividerProps } from '@mui/material/Divider'
import type { MenuItemProps } from '@mui/material/MenuItem'
import type { IconButtonProps } from '@mui/material/IconButton'
import type { LinkProps } from 'next/link'
import type { IconProps } from '@iconify/react'

export type OptionDividerType = {
  divider: boolean
  dividerProps?: DividerProps
  href?: never
  icon?: never
  text?: never
  linkProps?: never
  menuItemProps?: never
}
export type OptionMenuItemType = {
  text: ReactNode
  icon?: ReactNode
  linkProps?: LinkProps
  href?: LinkProps['href']
  menuItemProps?: MenuItemProps
  divider?: never
  dividerProps?: never
}

export type OptionType = string | OptionDividerType | OptionMenuItemType

export type OptionsMenuType = {
  icon?: ReactNode
  options: OptionType[]
  leftAlignMenu?: boolean
  iconButtonProps?: IconButtonProps
  iconProps?: Omit<IconProps, 'icon'>
  menuProps?: Omit<MenuProps, 'open'>
}
