// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { IconProps } from '@iconify/react'

const UserIcon = ({ icon, ...rest }: IconProps) => {
  return <Icon icon={icon} {...rest} />
}

export default UserIcon
