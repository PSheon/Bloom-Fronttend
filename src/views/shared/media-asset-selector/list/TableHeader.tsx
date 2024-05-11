// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { ChangeEvent } from 'react'
import type { SelectChangeEvent } from '@mui/material/Select'

interface TableHeaderProps {
  filteredMediaAssetName: string
  handleFilterMediaAssetName: (e: ChangeEvent<HTMLInputElement>) => void
  filteredExtension: string
  handleFilterExtensionChange: (e: SelectChangeEvent) => void
}

const MediaAssetSSelectorListTableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { filteredMediaAssetName, handleFilterMediaAssetName, filteredExtension, handleFilterExtensionChange } = props

  return (
    <Grid container spacing={6}>
      <Grid item flexGrow='1'>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <TextField
              size='small'
              fullWidth
              value={filteredMediaAssetName}
              sx={{ mb: 2 }}
              placeholder='Search name'
              onChange={handleFilterMediaAssetName}
              InputProps={{
                endAdornment: <InputAdornment position='end'>{<Icon icon='mdi:magnify' />}</InputAdornment>
              }}
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth size='small'>
              <InputLabel id='select-block-status-label'>篩選類型</InputLabel>
              <Select
                fullWidth
                value={filteredExtension}
                id='select--block-status'
                label='篩選類型'
                labelId='select-block-status-label'
                onChange={handleFilterExtensionChange}
                inputProps={{ placeholder: '篩選類型' }}
              >
                <MenuItem value='all'>所有類型</MenuItem>
                <MenuItem value='.png'>PNG</MenuItem>
                <MenuItem value='.jpg'>JPG</MenuItem>
                <MenuItem value='.pdf'>PDF</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button color='primary' variant='contained' component={Link} href='/management/media-asset/list'>
          管理檔案
        </Button>
      </Grid>
    </Grid>
  )
}

export default MediaAssetSSelectorListTableHeader
