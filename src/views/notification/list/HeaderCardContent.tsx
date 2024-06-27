// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import Collapse from '@mui/material/Collapse'
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
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
import type { Theme } from '@mui/material/styles'
import type { SelectChangeEvent } from '@mui/material/Select'

interface Props {
  filteredNotificationTitle: string
  handleFilterNotificationTitle: (e: ChangeEvent<HTMLInputElement>) => void
  filteredIsSeen: string
  handleFilterIsSeenChange: (e: SelectChangeEvent) => void
}

const NotificationListHeaderCardContent = (props: Props) => {
  // ** Props
  const { filteredNotificationTitle, handleFilterNotificationTitle, filteredIsSeen, handleFilterIsSeenChange } = props

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
        <Stack spacing={4} direction='row'>
          <Stack spacing={4} sx={{ flex: '1' }}>
            <TextField
              size='small'
              fullWidth
              value={filteredNotificationTitle}
              placeholder='Search notification title'
              onChange={handleFilterNotificationTitle}
              InputProps={{
                startAdornment: <InputAdornment position='start'>{<Icon icon='mdi:magnify' />}</InputAdornment>
              }}
            />
          </Stack>
          <Stack spacing={4} direction='row' sx={{ flex: '0' }}>
            {isDesktopView ? (
              <Button
                color={isShowFilters ? 'primary' : 'secondary'}
                variant={isShowFilters ? 'contained' : 'outlined'}
                startIcon={<Icon icon='mdi:filter-outline' fontSize={20} />}
                onClick={handleFiltersClick}
              >
                <Typography whiteSpace='nowrap' color='inherit'>
                  Filters
                </Typography>
              </Button>
            ) : (
              <Button
                color={isShowFilters ? 'primary' : 'secondary'}
                variant={isShowFilters ? 'contained' : 'outlined'}
                onClick={handleFiltersClick}
                sx={{ p: 1.5, minWidth: 38 }}
              >
                <Icon icon='mdi:filter-outline' fontSize={20} />
              </Button>
            )}
          </Stack>
        </Stack>
        <Collapse in={isShowFilters} timeout='auto' unmountOnExit>
          <Stack spacing={4} direction='row'>
            <FormControl fullWidth size='small'>
              <InputLabel id='select-is-seen-label'>Status</InputLabel>
              <Select
                fullWidth
                value={filteredIsSeen}
                id='select-is-seen'
                label='Status'
                labelId='select-is-seen-label'
                onChange={handleFilterIsSeenChange}
                inputProps={{ placeholder: 'Status' }}
              >
                <MenuItem value='all'>All</MenuItem>
                <MenuItem value='isSeen'>Seen</MenuItem>
                <MenuItem value='isNotSeen'>Not Seen</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Collapse>
      </Stack>
    </CardContent>
  )
}

export default NotificationListHeaderCardContent
