// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

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
          {`Welcome to ${themeConfig.templateName} Community`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='subtitle1' textAlign='center'>
          Discover the best funds in the ecosystem
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={6} sx={{ mt: 8 }}>
        <TextField
          fullWidth
          placeholder='Search fund...'
          value={filteredFundDisplayname}
          onChange={handleFilterFundDisplayname}
          InputProps={{
            sx: {
              borderRadius: '1.6rem'
            },
            startAdornment: (
              <InputAdornment position='start'>
                <IconButton>
                  <Icon icon='mdi:stars-outline' fontSize={20} />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton>
                  <Icon icon='mdi:search' fontSize={20} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default PublicFundListHeaderGrid
