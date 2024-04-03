// ** MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import CardContent from '@mui/material/CardContent'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import { EditorState, convertFromRaw } from 'draft-js'

// ** Utils Import
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Types
import { NotificationType } from 'src/types/api/notificationTypes'

// ** Api Imports
import { useUpdateMeOneMutation } from 'src/store/api/management/notification'

// ** Styled Component
import NotificationReadBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import NotificationReadSeenStatusAlert from 'src/views/notification/read/alerts/SeenStatusAlert'
import NotificationReadInformationCard from 'src/views/notification/read/cards/InformationCard'

// ** Styled Component Imports
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.background.default}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

interface Props {
  initNotificationEntity: NotificationType
}

const NotificationReadSection = (props: Props) => {
  // ** Props
  const { initNotificationEntity } = props

  // ** Hooks
  const [
    updateNotification,
    { data: updatedNotification = initNotificationEntity, isLoading: isUpdateNotificationLoading }
  ] = useUpdateMeOneMutation()

  // ** Logics
  const onSubmit = async () => {
    await updateNotification({
      id: initNotificationEntity.id,
      data: { isSeen: true }
    })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <NotificationReadBreadcrumbs
          pageLevels={[{ title: '我的通知', href: '/notification/list' }, { title: '查看通知' }]}
        />
      </Grid>
      <Grid item xl={9} md={8} xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h6'>通知者</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={6} flexWrap='nowrap'>
                  <Grid item>
                    <ProfilePicture
                      src={getPublicMediaAssetUrl(
                        initNotificationEntity.notifier.data?.attributes?.avatar?.data?.attributes.url
                      )}
                      alt='profile-picture'
                    />
                  </Grid>
                  <Grid container item flexGrow='1' flexDirection='column' justifyContent='center'>
                    <Grid item>
                      <Typography variant='h5' sx={{ fontSize: '1.375rem' }}>
                        {initNotificationEntity.notifier.data?.attributes?.username}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        {initNotificationEntity.notifier.data?.attributes?.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6'>標題</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size='small'
                  value={initNotificationEntity.title}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    startAdornment: <InputAdornment position='start'>#</InputAdornment>
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='h6'>內文</Typography>
              </Grid>
              <Grid item xs={12}>
                <EditorWrapper>
                  <ReactDraftWysiwyg
                    readOnly
                    editorState={EditorState.createWithContent(convertFromRaw(initNotificationEntity.content))}
                    toolbarHidden
                  />
                </EditorWrapper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xl={3} md={4} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <NotificationReadSeenStatusAlert initNotificationEntity={updatedNotification} />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <LoadingButton
                      fullWidth
                      onClick={onSubmit}
                      loading={isUpdateNotificationLoading}
                      disabled={updatedNotification.isSeen}
                      type='submit'
                      variant='contained'
                      endIcon={<Icon icon='mdi:eye-check-outline' />}
                    >
                      標記為已讀
                    </LoadingButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <NotificationReadInformationCard initNotificationEntity={updatedNotification} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NotificationReadSection
