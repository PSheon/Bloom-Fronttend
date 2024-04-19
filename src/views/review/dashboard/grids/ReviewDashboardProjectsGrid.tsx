// ** React Imports
// import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
// import { useFindQuery } from 'src/store/api/management/fund'

// ** Util Imports
import { getInitials } from 'src/@core/utils/get-initials'

// ** Type Imports
import { ProjectsTabType } from 'src/@fake-db/types'

const ProjectAvatar = ({ project }: { project: ProjectsTabType }) => {
  const { title, avatar, avatarColor = 'primary' } = project

  if (avatar.length) {
    return <CustomAvatar src={avatar} sx={{ width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar skin='light' color={avatarColor} sx={{ width: 38, height: 38 }}>
        {getInitials(title)}
      </CustomAvatar>
    )
  }
}

/* TODO: implement ui here */
const data: ProjectsTabType[] = [
  {
    daysLeft: 28,
    comments: 15,
    totalTask: 344,
    hours: '380/244',
    tasks: '290/344',
    budget: '$18.2k',
    completedTask: 328,
    deadline: '28/2/22',
    chipColor: 'success',
    startDate: '14/2/21',
    budgetSpent: '$24.8k',
    members: '280 members',
    title: 'Social Banners',
    client: 'Christian Jimenez',
    avatar: '/images/icons/project-icons/social-label.png',
    description: 'We are Consulting, Software Development and Web Development Services.',
    avatarGroup: [
      { avatar: '/images/avatars/1.png', name: 'Vinnie Mostowy' },
      { avatar: '/images/avatars/2.png', name: 'Allen Rieske' },
      { avatar: '/images/avatars/3.png', name: 'Julee Rossignol' }
    ]
  },
  {
    daysLeft: 15,
    comments: 236,
    totalTask: 90,
    tasks: '12/90',
    hours: '98/135',
    budget: '$1.8k',
    completedTask: 38,
    deadline: '21/6/22',
    budgetSpent: '$2.4k',
    chipColor: 'warning',
    startDate: '18/8/21',
    members: '1.1k members',
    title: 'Admin Template',
    client: 'Jeffrey Phillips',
    avatar: '/images/icons/project-icons/react-label.png',
    avatarGroup: [
      { avatar: '/images/avatars/4.png', name: "Kaith D'souza" },
      { avatar: '/images/avatars/5.png', name: 'John Doe' },
      { avatar: '/images/avatars/6.png', name: 'Alan Walker' }
    ],
    description: "Time is our most valuable asset, that's why we want to help you save it by creating…"
  },
  {
    daysLeft: 45,
    comments: 98,
    budget: '$420',
    totalTask: 140,
    tasks: '22/140',
    hours: '880/421',
    completedTask: 95,
    chipColor: 'error',
    budgetSpent: '$980',
    deadline: '8/10/21',
    title: 'App Design',
    startDate: '24/7/21',
    members: '458 members',
    client: 'Ricky McDonald',
    avatar: '/images/icons/project-icons/vue-label.png',
    description: 'App design combines the user interface (UI) and user experience (UX).',
    avatarGroup: [
      { avatar: '/images/avatars/7.png', name: 'Jimmy Ressula' },
      { avatar: '/images/avatars/8.png', name: 'Kristi Lawker' },
      { avatar: '/images/avatars/1.png', name: 'Danny Paul' }
    ]
  },
  {
    comments: 120,
    daysLeft: 126,
    totalTask: 420,
    budget: '2.43k',
    tasks: '237/420',
    hours: '1.2k/820',
    completedTask: 302,
    deadline: '12/9/22',
    budgetSpent: '$8.5k',
    chipColor: 'warning',
    startDate: '10/2/19',
    members: '137 members',
    client: 'Hulda Wright',
    title: 'Create Website',
    avatar: '/images/icons/project-icons/html-label.png',
    description: 'Your domain name should reflect your products or services so that your...',
    avatarGroup: [
      { avatar: '/images/avatars/2.png', name: 'Andrew Tye' },
      { avatar: '/images/avatars/3.png', name: 'Rishi Swaat' },
      { avatar: '/images/avatars/4.png', name: 'Rossie Kim' }
    ]
  },
  {
    daysLeft: 5,
    comments: 20,
    totalTask: 285,
    tasks: '29/285',
    budget: '28.4k',
    hours: '142/420',
    chipColor: 'error',
    completedTask: 100,
    deadline: '25/12/21',
    startDate: '12/12/20',
    members: '82 members',
    budgetSpent: '$52.7k',
    client: 'Jerry Greene',
    title: 'Figma Dashboard',
    avatar: '/images/icons/project-icons/figma-label.png',
    description: 'Use this template to organize your design project. Some of the key features are…',
    avatarGroup: [
      { avatar: '/images/avatars/5.png', name: 'Kim Merchent' },
      { avatar: '/images/avatars/6.png', name: "Sam D'souza" },
      { avatar: '/images/avatars/7.png', name: 'Nurvi Karlos' }
    ]
  },
  {
    daysLeft: 4,
    comments: 16,
    budget: '$655',
    totalTask: 290,
    tasks: '29/290',
    hours: '580/445',
    completedTask: 290,
    budgetSpent: '$1.3k',
    chipColor: 'success',
    deadline: '02/11/21',
    startDate: '17/8/21',
    title: 'Logo Design',
    members: '16 members',
    client: 'Olive Strickland',
    avatar: '/images/icons/project-icons/xd-label.png',
    description: 'Premium logo designs created by top logo designers. Create the branding of business.',
    avatarGroup: [
      { avatar: '/images/avatars/8.png', name: 'Kim Karlos' },
      { avatar: '/images/avatars/1.png', name: 'Katy Turner' },
      { avatar: '/images/avatars/2.png', name: 'Peter Adward' }
    ]
  }
]

const ReviewDashboardProjectsGrid = () => {
  // ** States
  // const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  // const {
  //   data: fundsData,
  //   isError: isFindFundListError,
  //   isLoading: isFindFundsListLoading
  // } = useFindQuery({
  //   filters: {},
  //   pagination: {
  //     page: paginationModel.page + 1,
  //     pageSize: paginationModel.pageSize
  //   }
  // })

  // ** Vars
  // const funds = fundsData?.data || []
  // const totalRows = fundsData?.meta.pagination.total || 0

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card
          sx={{
            border: '1px transparent solid',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
            '&:hover': {
              borderColor: theme => theme.palette.primary.main
            }
          }}
        >
          <CardHeader
            avatar={
              <AvatarGroup className='pull-up'>
                <Tooltip title='demo 01'>
                  <CustomAvatar src='/images/avatars/1.png' alt='demo 01' sx={{ height: 48, width: 48 }} />
                </Tooltip>
                <Tooltip title='demo 02'>
                  <CustomAvatar src='/images/avatars/2.png' alt='demo 02' sx={{ height: 48, width: 48 }} />
                </Tooltip>
              </AvatarGroup>
            }
            sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
            subheader={<Typography sx={{ color: 'text.secondary' }}>Blast</Typography>}
            action={
              <Button variant='contained' sx={{ alignSelf: 'center' }}>
                查看
              </Button>
            }
            title={
              <Typography
                href='/'
                variant='h6'
                component={Link}
                onClick={e => e.preventDefault()}
                sx={{
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                Display Name
              </Typography>
            }
          />
          <CardContent>
            <Box
              sx={{
                mb: 4,
                gap: 2,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <CustomChip
                rounded
                size='small'
                skin='light'
                sx={{ height: 60 }}
                label={
                  <>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ fontWeight: 500 }}>6,543</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{`/${8_000}`}</Typography>
                    </Box>
                    <Typography sx={{ color: 'text.secondary' }}>Total Budget</Typography>
                  </>
                }
              />
              <Box sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 1, fontWeight: 500 }}>Start Date:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>2024</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 1, fontWeight: 500 }}>Deadline:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>2024</Typography>
                </Box>
              </Box>
            </Box>
            <Typography sx={{ color: 'text.secondary' }}>
              description description description description description
            </Typography>
          </CardContent>
          <Divider sx={{ my: '0 !important' }} />
          <CardContent>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 1, fontWeight: 500 }}>All Hours:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>62</Typography>
              </Box>
              <CustomChip size='small' skin='light' color='success' label={`${25} days left`} />
            </Box>
            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant='body2'>{`Tasks: ${12}/${34}`}</Typography>
              <Typography variant='body2'>{`${Math.round(80)}% Completed`}</Typography>
            </Box>
            <LinearProgress
              color='primary'
              variant='determinate'
              value={Math.round(1.2 * 100)}
              sx={{
                mb: 4,
                height: 8,
                borderRadius: 2,
                '& .MuiLinearProgress-bar': { borderRadius: 2 }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AvatarGroup className='pull-up' sx={{ mr: 2 }}>
                  <Tooltip title='demo 01'>
                    <CustomAvatar src='/images/avatars/1.png' alt='demo 01' sx={{ height: 32, width: 32 }} />
                  </Tooltip>
                  <Tooltip title='demo 02'>
                    <CustomAvatar src='/images/avatars/2.png' alt='demo 02' sx={{ height: 32, width: 32 }} />
                  </Tooltip>
                  <Tooltip title='demo 03'>
                    <CustomAvatar src='/images/avatars/3.png' alt='demo 03' sx={{ height: 32, width: 32 }} />
                  </Tooltip>
                </AvatarGroup>
                <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                  234
                </Typography>
              </Box>
              <Box
                href='/'
                component={Link}
                onClick={e => e.preventDefault()}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  '& svg': { mr: 1, color: 'text.secondary' }
                }}
              >
                <Icon icon='mdi:message-outline' />
                <Typography sx={{ color: 'text.secondary' }}>13</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {data.map((item, index) => (
        <Grid key={index} item xs={12}>
          <Card>
            <CardHeader
              avatar={<ProjectAvatar project={item} />}
              sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
              subheader={
                <Typography sx={{ color: 'text.secondary' }}>
                  <strong>Client:</strong> {item.client}
                </Typography>
              }
              action={
                <OptionsMenu
                  iconButtonProps={{ size: 'small' }}
                  options={[
                    'Rename Project',
                    'View Details',
                    'Add to Favorites',
                    { divider: true },
                    { text: 'Leave Project', menuItemProps: { sx: { color: 'error.main' } } }
                  ]}
                />
              }
              title={
                <Typography
                  href='/'
                  variant='h6'
                  component={Link}
                  onClick={e => e.preventDefault()}
                  sx={{
                    color: 'text.primary',
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {item.title}
                </Typography>
              }
            />
            <CardContent>
              <Box
                sx={{
                  mb: 4,
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <CustomChip
                  rounded
                  size='small'
                  skin='light'
                  sx={{ height: 60 }}
                  label={
                    <>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ fontWeight: 500 }}>{item.budgetSpent}</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{`/${item.budget}`}</Typography>
                      </Box>
                      <Typography sx={{ color: 'text.secondary' }}>Total Budget</Typography>
                    </>
                  }
                />
                <Box sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 1, fontWeight: 500 }}>Start Date:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{item.startDate}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 1, fontWeight: 500 }}>Deadline:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{item.deadline}</Typography>
                  </Box>
                </Box>
              </Box>
              <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
            </CardContent>
            <Divider sx={{ my: '0 !important' }} />
            <CardContent>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 1, fontWeight: 500 }}>All Hours:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{item.hours}</Typography>
                </Box>
                <CustomChip size='small' skin='light' color={item.chipColor} label={`${item.daysLeft} days left`} />
              </Box>
              <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='body2'>{`Tasks: ${item.completedTask}/${item.totalTask}`}</Typography>
                <Typography variant='body2'>
                  {`${Math.round((item.completedTask / item.totalTask) * 100)}% Completed`}
                </Typography>
              </Box>
              <LinearProgress
                color='primary'
                variant='determinate'
                value={Math.round((item.completedTask / item.totalTask) * 100)}
                sx={{
                  mb: 4,
                  height: 8,
                  borderRadius: 2,
                  '& .MuiLinearProgress-bar': { borderRadius: 2 }
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AvatarGroup className='pull-up' sx={{ mr: 2 }}>
                    {item.avatarGroup &&
                      item.avatarGroup.map((person, index) => {
                        return (
                          <Tooltip key={index} title={person.name}>
                            <CustomAvatar src={person.avatar} alt={person.name} sx={{ height: 32, width: 32 }} />
                          </Tooltip>
                        )
                      })}
                  </AvatarGroup>
                  <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                    {item.members}
                  </Typography>
                </Box>
                <Box
                  href='/'
                  component={Link}
                  onClick={e => e.preventDefault()}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    '& svg': { mr: 1, color: 'text.secondary' }
                  }}
                >
                  <Icon icon='mdi:message-outline' />
                  <Typography sx={{ color: 'text.secondary' }}>{item.comments}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ReviewDashboardProjectsGrid
