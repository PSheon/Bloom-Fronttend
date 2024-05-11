// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

// ** Type Imports
import type { ChangeEvent } from 'react'

interface Props {
  filteredFundDisplayname: string
  handleFilterFundDisplayname: (e: ChangeEvent<HTMLInputElement>) => void

  // filteredStatus: string
  // handleFilterStatusChange: (e: SelectChangeEvent) => void
  // filteredIsHighlighted: string
  // handleIsHighlightedChange: (e: SelectChangeEvent) => void
}

const PublicFundListHeaderGrid = (props: Props) => {
  // ** Props
  const {
    filteredFundDisplayname,
    handleFilterFundDisplayname

    // filteredStatus,
    // handleFilterStatusChange,
    // filteredIsHighlighted,
    // handleIsHighlightedChange
  } = props

  return (
    <Grid container spacing={6} alignItems='center' justifyContent='center' sx={{ my: 16 }}>
      <Grid item xs={12}>
        <Typography variant='h3' textAlign='center' sx={{ fontWeight: 600, lineHeight: 1.17 }}>
          Welcome to Bloom Community
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='subtitle1' textAlign='center'>
          Explore thousands of free and paid templates, plugins, and UI kits to kickstart your next big idea.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={6} sx={{ mt: 8 }}>
        <TextField
          fullWidth
          placeholder='Search fund...'
          value={filteredFundDisplayname}
          onChange={handleFilterFundDisplayname}
        />
      </Grid>
    </Grid>
  )
}

export default PublicFundListHeaderGrid
