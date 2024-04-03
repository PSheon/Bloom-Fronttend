// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { ThemeColor } from 'src/@core/layouts/types'

const RootBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  minWidth: 64,
  height: '100%',
  minHeight: 64,
  display: 'flex',
  borderRadius: 8,
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  transition: 'box-shadow .25s ease'
}))

interface Props {
  selected: ThemeColor
  backgroundColor: string
  value: string
  handleClick: () => void
}

const ThemeColorSelectBox = (props: Props) => {
  // ** Props
  const { selected, value, backgroundColor, handleClick } = props

  return (
    <RootBox
      onClick={handleClick}
      sx={{
        ml: 0,
        backgroundColor: backgroundColor,
        ...(selected === value ? { boxShadow: 9 } : { '&:hover': { boxShadow: 4 } })
      }}
    >
      {selected === value ? <Icon icon='mdi:check' fontSize='1.25rem' /> : null}
    </RootBox>
  )
}

export default ThemeColorSelectBox
