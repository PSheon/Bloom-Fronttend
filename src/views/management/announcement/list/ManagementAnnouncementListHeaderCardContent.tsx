// ** React Imports
import { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import Collapse from '@mui/material/Collapse'
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Components
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useCreateMutation } from 'src/store/api/management/announcement'

// ** Type Imports
import type { ChangeEvent } from 'react'
import type { Theme } from '@mui/material/styles'
import type { SelectChangeEvent } from '@mui/material/Select'

interface Props {
  filteredAnnouncementDisplayname: string
  handleFilterAnnouncementDisplayname: (e: ChangeEvent<HTMLInputElement>) => void
  filteredIsPublished: string
  handleFilterIsPublishedChange: (e: SelectChangeEvent) => void
  filteredIsHighlighted: string
  handleIsHighlightedChange: (e: SelectChangeEvent) => void
  handleRefetchAnnouncementList: () => void
}

const ManagementAnnouncementListHeaderCardContent = (props: Props) => {
  // ** Props
  const {
    filteredAnnouncementDisplayname,
    handleFilterAnnouncementDisplayname,
    filteredIsPublished,
    handleFilterIsPublishedChange,
    filteredIsHighlighted,
    handleIsHighlightedChange,
    handleRefetchAnnouncementList
  } = props

  // ** States
  const [isShowFilters, serIsShowFilters] = useState<boolean>(false)

  // ** Hooks
  const isDesktopView = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const session = useSession()
  const router = useRouter()
  const [createNewAnnouncement, { isLoading: isCreateNewAnnouncementLoading }] = useCreateMutation()

  // ** Logics
  const handleFiltersClick = () => {
    serIsShowFilters(currentIsShowFilters => !currentIsShowFilters)
  }

  const handleCreateNewAnnouncement = async () => {
    try {
      const backendResponse = await createNewAnnouncement({
        data: {
          displayName: 'New Announcement',
          author: session.data!.user.id
        }
      }).unwrap()

      if (backendResponse?.id) {
        router.push(`/management/announcement/edit/${backendResponse.id}`)
      } else {
        toast.error('Error occurred while creating new announcement.')
      }
    } catch (error) {
      toast.error('Error occurred while creating new announcement.')
    }
  }

  return (
    <CardContent>
      <Stack spacing={6}>
        <Stack spacing={4} direction='row'>
          <Stack spacing={4} sx={{ flex: '1' }}>
            <TextField
              size='small'
              fullWidth
              value={filteredAnnouncementDisplayname}
              placeholder='尋找標題'
              onChange={handleFilterAnnouncementDisplayname}
              InputProps={{
                startAdornment: <InputAdornment position='start'>{<Icon icon='mdi:magnify' />}</InputAdornment>,
                endAdornment: (
                  <IconButton onClick={handleRefetchAnnouncementList}>
                    <Icon icon='mdi:reload' fontSize={20} />
                  </IconButton>
                )
              }}
            />
          </Stack>
          <Stack spacing={4} direction='row' sx={{ flex: '0' }}>
            {isDesktopView ? (
              <Button
                color={isShowFilters ? 'primary' : 'secondary'}
                variant={isShowFilters ? 'contained' : 'outlined'}
                endIcon={<Icon icon='mdi:filter-outline' fontSize={20} />}
                onClick={handleFiltersClick}
              >
                <Typography whiteSpace='nowrap' color='inherit'>
                  篩選
                </Typography>
              </Button>
            ) : (
              <Button
                color={isShowFilters ? 'primary' : 'secondary'}
                variant={isShowFilters ? 'contained' : 'outlined'}
                onClick={handleFiltersClick}
              >
                <Icon icon='mdi:filter-outline' fontSize={20} />
              </Button>
            )}
            {isDesktopView ? (
              <LoadingButton
                loading={isCreateNewAnnouncementLoading}
                onClick={handleCreateNewAnnouncement}
                variant='contained'
                endIcon={<Icon icon='mdi:add-circle-outline' />}
              >
                <Typography whiteSpace='nowrap' color='inherit'>
                  建立
                </Typography>
              </LoadingButton>
            ) : (
              <LoadingButton
                loading={isCreateNewAnnouncementLoading}
                onClick={handleCreateNewAnnouncement}
                variant='contained'
              >
                <Icon icon='mdi:add-circle-outline' fontSize={20} />
              </LoadingButton>
            )}
          </Stack>
        </Stack>
        <Collapse in={isShowFilters} timeout='auto' unmountOnExit>
          <Stack spacing={4} direction='row'>
            <FormControl fullWidth size='small'>
              <InputLabel id='select-is-published-label'>篩選類型</InputLabel>
              <Select
                fullWidth
                value={filteredIsPublished}
                id='select-is-published'
                label='篩選類型'
                labelId='select-is-published-label'
                onChange={handleFilterIsPublishedChange}
                inputProps={{ placeholder: '篩選類型' }}
              >
                <MenuItem value='all'>所有類型</MenuItem>
                <MenuItem value='isPublished'>已發布</MenuItem>
                <MenuItem value='issNotPublished'>未發布</MenuItem>
              </Select>
            </FormControl>
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
          </Stack>
        </Collapse>
      </Stack>
    </CardContent>
  )
}

export default ManagementAnnouncementListHeaderCardContent
