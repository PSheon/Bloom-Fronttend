// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { ThemeColor } from 'src/@core/layouts/types'

interface Props {
  selected: string
  value: string
  icon: string
  title: string
  color: ThemeColor
  handleClick: () => void
}

const LanguageSelectBox = (props: Props) => {
  // ** Props
  const { selected, value, icon, title, color = 'primary', handleClick } = props

  return (
    <Box
      onClick={handleClick}
      sx={{
        height: '100%',
        width: theme => theme.spacing(40),
        display: 'flex',
        p: 1,
        borderRadius: 1,
        cursor: 'pointer',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        border: theme => `3px solid ${theme.palette.divider}`,
        transition: theme => theme.transitions.create(['border-color']),
        ...(selected === value
          ? {
              borderColor: `${color}.main`
            }
          : { '&:hover': { borderColor: theme => `rgba(${theme.palette.customColors.main}, 0.25)` } })
      }}
    >
      <Box sx={{ p: 4 }}>
        <Icon icon={icon} fontSize={48} />
      </Box>
      <Typography variant='subtitle2' sx={{ my: 1, color: 'text.primary' }}>
        {title}
      </Typography>
    </Box>
  )
}

export default LanguageSelectBox
