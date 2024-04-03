// ** MUI Imports
import { useTheme, alpha } from '@mui/material/styles'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

interface Props {
  width?: number
  height?: number
  color?: ThemeColor
}

const LogoImage = (props: Props) => {
  // ** Props
  const { width = 40, height = 40, color } = props

  // ** Hooks & Vars
  const theme = useTheme()

  return (
    <svg
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      style={{ filter: `drop-shadow(3px 5px 2px ${alpha(color || theme.palette.secondary.main, 0.1)})` }}
    >
      <path
        d='M17,9a4.08,4.08,0,0,0-.93.12,5,5,0,0,0-9,2.09A3,3,0,1,0,6,17H17a4,4,0,0,0,0-8Z'
        style={{
          fill: color || theme.palette.primary.main,
          stroke: alpha(color || theme.palette.secondary.main, 0.1),
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 1
        }}
      />
    </svg>
  )
}

export default LogoImage
