// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Core Component Imports
import PageHeader from 'src/@core/components/page-header'
import CardSnippet from 'src/@core/components/card-snippet'
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'

// ** Custom Component Imports
import InputMaskExamples from 'src/views/forms/form-elements/input-mask/InputMaskExamples'

// ** Constant Imports
import * as source from 'src/views/forms/form-elements/input-mask/InputMaskSourceCode'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const InputMask = () => {
  return (
    <CleaveWrapper>
      <Grid container spacing={6}>
        <PageHeader
          title={
            <Typography variant='h5'>
              <LinkStyled href='https://github.com/nosir/cleave.js' target='_blank'>
                Cleave.js
              </LinkStyled>
            </Typography>
          }
          subtitle={<Typography variant='body2'>Format input text content when you are typing</Typography>}
        />
        <Grid item xs={12}>
          <CardSnippet
            title='Input Masks'
            code={{
              tsx: source.InputMaskExamplesTSXCode,
              jsx: source.InputMaskExamplesJSXCode
            }}
          >
            <InputMaskExamples />
          </CardSnippet>
        </Grid>
      </Grid>
    </CleaveWrapper>
  )
}

export default InputMask
