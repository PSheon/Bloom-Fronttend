// ** MUI Imports
import MuiBadge from '@mui/material/Badge'

// ** Hook Imports
import useBgColor from 'src/@core/hooks/useBgColor'

// ** Type Imports
import type { UseBgColorType } from 'src/@core/hooks/useBgColor'
import type { CustomBadgeProps } from './types'

const Badge = (props: CustomBadgeProps) => {
  // ** Props
  const { sx, skin, color } = props

  // ** Hooks
  const bgColors = useBgColor()

  const colors: UseBgColorType = {
    primary: { ...bgColors.primaryLight },
    secondary: { ...bgColors.secondaryLight },
    success: { ...bgColors.successLight },
    error: { ...bgColors.errorLight },
    warning: { ...bgColors.warningLight },
    info: { ...bgColors.infoLight }
  }

  return (
    <MuiBadge
      {...props}
      sx={skin === 'light' && color ? Object.assign({ '& .MuiBadge-badge': colors[color] }, sx) : sx}
    />
  )
}

export default Badge
