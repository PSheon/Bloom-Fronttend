// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Collapse from '@mui/material/Collapse'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface Props {
  filteredRequestSheetTitle: string
  handleFilterRequestSheetTitle: (e: ChangeEvent<HTMLInputElement>) => void
  filteredIsHighlighted: string
  handleIsHighlightedChange: (e: SelectChangeEvent) => void
}

const RequestSheetListHeaderCardContent = (props: Props) => {
  // ** Props
  const { filteredRequestSheetTitle, handleFilterRequestSheetTitle, filteredIsHighlighted, handleIsHighlightedChange } =
    props

  // ** States
  const [isShowFilters, serIsShowFilters] = useState<boolean>(false)

  // ** Hooks
  const isDesktopView = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  // ** Logics
  const handleFiltersClick = () => {
    serIsShowFilters(currentIsShowFilters => !currentIsShowFilters)
  }

  return (
    <CardContent>
      <Stack spacing={6}>
        <Stack spacing={6} direction='row'>
          <Stack spacing={6} sx={{ flex: '1' }}>
            <TextField
              size='small'
              fullWidth
              value={filteredRequestSheetTitle}
              placeholder='尋找通知名稱'
              onChange={handleFilterRequestSheetTitle}
              InputProps={{
                startAdornment: <InputAdornment position='start'>{<Icon icon='mdi:magnify' />}</InputAdornment>
              }}
            />
          </Stack>
          <Stack spacing={6} direction='row' sx={{ flex: '0' }}>
            {isDesktopView && (
              <Button
                color={isShowFilters ? 'primary' : 'secondary'}
                variant={isShowFilters ? 'contained' : 'outlined'}
                startIcon={<Icon icon='mdi:filter-outline' fontSize={20} />}
                onClick={handleFiltersClick}
              >
                <Typography whiteSpace='nowrap' color='inherit'>
                  篩選
                </Typography>
              </Button>
            )}
            <Button component={Link} variant='contained' href='/request-sheet/add'>
              <Typography whiteSpace='nowrap' color='inherit'>
                開始申請
              </Typography>
            </Button>
          </Stack>
        </Stack>
        <Collapse in={isShowFilters} timeout='auto' unmountOnExit>
          <Stack spacing={6} direction='row'>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth size='small'>
                <InputLabel id='select-is-highlighted-label'>篩選星號</InputLabel>
                <Select
                  fullWidth
                  value={filteredIsHighlighted}
                  id='select-is-highlighted'
                  label='篩選開通狀態'
                  labelId='select-is-highlighted-label'
                  onChange={handleIsHighlightedChange}
                  inputProps={{ placeholder: '篩選星號' }}
                >
                  <MenuItem value='all'>全部星號</MenuItem>
                  <MenuItem value='isHighlighted'>已加星號</MenuItem>
                  <MenuItem value='isNotHighlighted'>未加星號</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Stack>
        </Collapse>
      </Stack>
    </CardContent>
  )
}

export default RequestSheetListHeaderCardContent
