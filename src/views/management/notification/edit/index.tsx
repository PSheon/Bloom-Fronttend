// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import CardContent from '@mui/material/CardContent'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'

// ** Core Component Imports
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'

// ** Custom Component Imports
import NotificationEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import NotificationEditSeenStatusAlert from 'src/views/management/notification/edit/alerts/SeenStatusAlert'
import NotificationEditInformationCard from 'src/views/management/notification/edit/cards/InformationCard'
import NotificationEditDeleteButton from 'src/views/management/notification/edit/buttons/DeleteButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/notification'

// ** Util Import
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import { NotificationType } from 'src/types/api/notificationTypes'

// ** Style Imports
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const schema = yup.object().shape({
  title: yup.string().min(3).required()
})

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

interface FormData {
  title: string
}

const NotificationEditSection = (props: Props) => {
  // ** Props
  const { initNotificationEntity } = props

  // ** States
  const [content, setContent] = useState(EditorState.createWithContent(convertFromRaw(initNotificationEntity.content)))
  const [isContentDirty, setIsContentDirty] = useState<boolean>(false)

  // ** Hooks
  const [
    updateNotification,
    { data: updatedNotification = initNotificationEntity, isLoading: isUpdateNotificationLoading }
  ] = useUpdateOneMutation()
  const {
    control,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      title: initNotificationEntity.title
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Logics
  const onSubmit = async (data: FormData) => {
    const { title } = data

    await updateNotification({
      id: initNotificationEntity.id,
      data: { title, content: convertToRaw(content.getCurrentContent()) }
    })
    setIsContentDirty(false)
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <NotificationEditBreadcrumbs
            pageLevels={[{ title: '通知管理', href: '/management/notification/list' }, { title: '編輯通知' }]}
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
                          initNotificationEntity.notifier.data?.attributes.avatar?.data?.attributes.url
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
                  <FormControl fullWidth>
                    <Controller
                      name='title'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          size='small'
                          value={value}
                          fullWidth
                          InputProps={{
                            startAdornment: <InputAdornment position='start'>#</InputAdornment>
                          }}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.title)}
                        />
                      )}
                    />
                    {errors.title && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='h6'>內文</Typography>
                </Grid>
                <Grid item xs={12}>
                  <EditorWrapper>
                    <ReactDraftWysiwyg
                      editorState={content}
                      onEditorStateChange={content => {
                        setContent(content)
                        setIsContentDirty(true)
                      }}
                      toolbar={{
                        options: [
                          'history',
                          'blockType',
                          'inline',
                          'colorPicker',
                          'link',
                          'textAlign',
                          'list',
                          'remove'
                        ],
                        inline: {
                          inDropdown: false,
                          options: ['bold']
                        },
                        blockType: {
                          inDropdown: true,
                          options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']
                        },
                        textAlign: {
                          inDropdown: true
                        }
                      }}
                      localization={{
                        locale: 'zh_tw'
                      }}
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
              <NotificationEditSeenStatusAlert initNotificationEntity={updatedNotification} />
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <LoadingButton
                        fullWidth
                        loading={isUpdateNotificationLoading}
                        disabled={(!isDirty && !isContentDirty) || Boolean(errors.title)}
                        type='submit'
                        variant='contained'
                        endIcon={<Icon icon='mdi:content-save-outline' />}
                      >
                        儲存通知
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <NotificationEditInformationCard initNotificationEntity={updatedNotification} />
            </Grid>
            <Grid item xs={12}>
              <NotificationEditDeleteButton initNotificationEntity={updatedNotification} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default NotificationEditSection
