// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Type Imports
import type { Theme } from '@mui/material/styles'

// ** Styled Link Component
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FooterContent = () => {
  // ** Vars
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      {hidden ? (
        <Typography sx={{ mr: 2 }}>
          {`© ${new Date().getFullYear()}, By `}
          <LinkStyled target='_blank' href='https://github.com/PSheon'>
            PSheon
          </LinkStyled>
        </Typography>
      ) : (
        <Typography sx={{ mr: 2 }}>
          {`© ${new Date().getFullYear()}, Made with `}
          <Box component='span' sx={{ color: 'error.main' }}>
            ❤️
          </Box>
          {` by `}
          <LinkStyled target='_blank' href='https://github.com/PSheon'>
            PSheon
          </LinkStyled>
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
        <LinkStyled target='_blank' href='https://demos.pixinvent.com/materialize-nextjs-admin-template/documentation'>
          Documentation
        </LinkStyled>
      </Box>
    </Box>
  )
}

export default FooterContent
