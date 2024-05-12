// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import Collapse from '@mui/material/Collapse'
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Imports
import MediaAssetUploaderButton from 'src/views/shared/media-asset-uploader'

// ** Type Imports
import type { ChangeEvent } from 'react'
import type { Theme } from '@mui/material/styles'
import type { SelectChangeEvent } from '@mui/material/Select'

interface Props {
  filteredMediaAssetName: string
  handleFilterMediaAssetName: (e: ChangeEvent<HTMLInputElement>) => void
  filteredExtension: string
  handleFilterExtensionChange: (e: SelectChangeEvent) => void
  handleRefetchMediaAssetList: () => void
}

const ManagementMediaAssetListHeaderCardContent = (props: Props) => {
  // ** Props
  const {
    filteredMediaAssetName,
    handleFilterMediaAssetName,
    filteredExtension,
    handleFilterExtensionChange,
    handleRefetchMediaAssetList
  } = props

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
              value={filteredMediaAssetName}
              placeholder='尋找文件名稱'
              onChange={handleFilterMediaAssetName}
              InputProps={{
                startAdornment: <InputAdornment position='start'>{<Icon icon='mdi:magnify' />}</InputAdornment>,
                endAdornment: (
                  <IconButton onClick={handleRefetchMediaAssetList}>
                    <Icon icon='mdi:reload' fontSize={20} />
                  </IconButton>
                )
              }}
            />
          </Stack>
          <Stack spacing={4} direction='row' sx={{ flex: '0' }}>
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
            <MediaAssetUploaderButton />
          </Stack>
        </Stack>
        <Collapse in={isShowFilters} timeout='auto' unmountOnExit>
          <Stack spacing={4} direction='row'>
            <FormControl fullWidth size='small'>
              <InputLabel id='select-extension-label'>篩選類型</InputLabel>
              <Select
                fullWidth
                value={filteredExtension}
                id='select-extension'
                label='篩選類型'
                labelId='select-extension-label'
                onChange={handleFilterExtensionChange}
                inputProps={{ placeholder: '篩選類型' }}
              >
                <MenuItem value='all'>所有類型</MenuItem>
                <MenuItem value='.png'>PNG</MenuItem>
                <MenuItem value='.jpg'>JPG</MenuItem>
                <MenuItem value='.pdf'>PDF</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Collapse>
      </Stack>
    </CardContent>
  )
}

export default ManagementMediaAssetListHeaderCardContent
