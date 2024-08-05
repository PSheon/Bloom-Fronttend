// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Custom Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Type Imports
import type { ThemeColor } from 'src/@core/layouts/types'

interface Props {
  selected: string
  value: string
  image: string
  progressText: string
  title: string
  color: ThemeColor
  handleClick: () => void
}

const LanguageSelectBox = (props: Props) => {
  // ** Props
  const { selected, value, image, progressText, title, color = 'primary', handleClick } = props

  return (
    <Box
      onClick={handleClick}
      sx={{
        height: '100%',
        display: 'flex',
        p: 1,
        pt: 6,
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
          padding: 2,
          width: '100%',
          maxWidth: 48,
          height: '100%',
          maxHeight: 48,
          objectFit: 'cover',
          filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
        }
      }}
    >
      <CustomChip
        skin='light'
        color='success'
        rounded
        label={progressText}
        sx={{
          top: 6,
          left: 6,
          height: 24,
          position: 'absolute',
          '& .MuiChip-label': {
            px: 1.75,
            fontWeight: 600,
            fontSize: '0.75rem'
          }
        }}
      />
      <img src={image} alt={title} />
      <Typography variant='subtitle2' component='p' textAlign='center' color='text.primary' sx={{ my: 1 }}>
        {title}
      </Typography>
    </Box>
  )
}

export default LanguageSelectBox
