// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Styled Components
const LandingLayoutWrapper = styled('div')({
  height: '100%',
  display: 'flex'
})
const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column'
})

interface Props {
  children: ReactNode
}

const LandingLayout = ({ children }: Props) => {
  return (
    <LandingLayoutWrapper className='layout-wrapper'>
      <MainContentWrapper className='layout-content-wrapper'>{children}</MainContentWrapper>
    </LandingLayoutWrapper>
  )
}

export default LandingLayout
