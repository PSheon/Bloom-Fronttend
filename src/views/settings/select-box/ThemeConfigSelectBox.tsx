// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Type Imports
import type { ThemeColor } from 'src/@core/layouts/types'

interface Props {
  selected: string
  value: string
  image: string
  title: string
  color: ThemeColor
  handleClick: () => void
}

const ThemeConfigSelectBox = (props: Props) => {
  // ** Props
  const { selected, value, image, title, color = 'primary', handleClick } = props

  return (
    <Box
      onClick={handleClick}
      sx={{
        height: '100%',
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
          : { '&:hover': { borderColor: theme => `rgba(${theme.palette.customColors.main}, 0.25)` } }),
        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }
      }}
    >
      <img src={image} alt={title} />
      <Typography variant='subtitle2' sx={{ my: 1, color: 'text.primary' }}>
        {title}
      </Typography>
    </Box>
  )
}

export default ThemeConfigSelectBox
