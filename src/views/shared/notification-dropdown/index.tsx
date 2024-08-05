// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu from '@mui/material/Menu'
import MuiMenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import format from 'date-fns/format'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import MenuLoadingSkeleton from 'src/views/shared/notification-dropdown/LoadingSkeleton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/notification'

// ** Util Imports
import { getNotificationAttributes } from 'src/utils'

// ** Type Imports
import type { SyntheticEvent, ReactNode } from 'react'
import type { Theme } from '@mui/material/styles'
import type { MenuProps } from '@mui/material/Menu'
import type { MenuItemProps } from '@mui/material/MenuItem'
import type { TypographyProps } from '@mui/material/Typography'
import type { Settings } from 'src/@core/context/settingsContext'
import type { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'
import type { NotificationType } from 'src/types/notificationTypes'

interface Props {
  settings: Settings
}

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: 344
})

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
  width: 38,
  height: 38,
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

const ScrollWrapper = ({ children, hidden }: { children: ReactNode; hidden: boolean }) => {
  if (hidden) {
    return <Box sx={{ maxHeight: 349, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
  }
}

const NotificationDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  // ** Hooks
  const router = useRouter()
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const { data: meNotificationsData, isLoading: isMeNotificationListLoading } = useFindMeQuery({
    filters: {
      isSeen: false
    },
    sort: ['date:desc'],
    pagination: {
      page: 1,
      pageSize: 5
    }
  })

  // ** Vars
  const { direction } = settings
  const meNotifications = meNotificationsData?.data || []
  const totalRows = meNotificationsData?.meta.pagination.total || 0

  // ** Logics
  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const handleClickNotification = (notificationId: number) => {
    handleDropdownClose()
    router.push(`/notification/read/${notificationId}`)
  }

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <Badge
          color='error'
          variant='dot'
          invisible={totalRows === 0}
          sx={{
            '& .MuiBadge-badge': { top: 4, right: 4, boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}` }
          }}
        >
          <Icon icon='mdi:bell-outline' />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ cursor: 'text', fontWeight: 600 }}>Notifications</Typography>
            <CustomChip
              skin='light'
              size='small'
              color='primary'
              rounded
              label={`${totalRows} New`}
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        {isMeNotificationListLoading ? (
          <MenuLoadingSkeleton />
        ) : (
          <ScrollWrapper hidden={hidden}>
            {meNotifications.map((notification: NotificationType, index: number) => {
              const { icon, color } = getNotificationAttributes(notification.category)

              return (
                <MenuItem key={`me-notification-${index}`} onClick={() => handleClickNotification(notification.id)}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Avatar skin='light' color={color}>
                      <Icon icon={icon} />
                    </Avatar>
                    <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                      <MenuItemTitle>{notification.title}</MenuItemTitle>
                    </Box>
                    <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                      {format(new Date(notification.updatedAt), 'MM/dd')}
                    </Typography>
                  </Box>
                </MenuItem>
              )
            })}
          </ScrollWrapper>
        )}
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            py: 3.5,
            borderBottom: 0,
            cursor: 'default',
            userSelect: 'auto',
            backgroundColor: 'transparent !important',
            borderTop: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Button
            fullWidth
            variant='contained'
            component={Link}
            href={`/notification/list`}
            onClick={handleDropdownClose}
          >
            Read all notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
