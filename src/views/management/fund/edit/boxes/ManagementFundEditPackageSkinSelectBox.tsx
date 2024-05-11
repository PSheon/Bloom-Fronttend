// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { SxProps, Theme } from '@mui/material/styles'
import type { BoxProps } from '@mui/material/Box'
import type { SkinType } from 'src/types/packageTypes'

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
  selected: SkinType
  value: string
  handleClick: () => void
  sx: SxProps<Theme>
}

const ManagementFundEditPackageSkinSelectBox = (props: Props) => {
  // ** Props
  const { selected, value, sx, handleClick } = props

  return (
    <RootBox
      onClick={handleClick}
      sx={{
        ml: 0,
        ...(selected === value ? { boxShadow: 9 } : { '&:hover': { boxShadow: 4 } }),
        ...sx
      }}
    >
      {selected === value ? <Icon icon='mdi:check' fontSize='1.25rem' /> : null}
    </RootBox>
  )
}

export default ManagementFundEditPackageSkinSelectBox
