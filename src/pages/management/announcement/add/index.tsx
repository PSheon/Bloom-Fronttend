// ** React Imports
import { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import CardContent from '@mui/material/CardContent'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EditorState, ContentState, convertToRaw } from 'draft-js'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

// ** API Imports
import { useCreateMutation } from 'src/store/api/management/announcement'

// ** Core Component Imports
import ReactDraftWysiwyg, { initContentBlocks } from 'src/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'

// ** Custom Component Imports
import ManagementAnnouncementAddBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementAnnouncementAddInformationCard from 'src/views/management/announcement/add/ManagementAnnouncementAddInformationCard'

// ** Style Imports
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const schema = yup.object().shape({
  displayName: yup.string().required()
})

const defaultValues = {
  displayName: ''
}

interface FormData {
  displayName: string
}

const ManagementAnnouncementAddPage = () => {
  // ** States
  const [content, setContent] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(initContentBlocks.blocks, initContentBlocks.entityMap)
    )
  )

  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  const [createNewAnnounce, { data: createdAnnouncement, isLoading: isCreateNewAnnouncementLoading }] =
    useCreateMutation()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Logics
  const onSubmit = async (data: FormData) => {
    const { displayName } = data

    await createNewAnnounce({
      data: { displayName, content: convertToRaw(content.getCurrentContent()), author: auth.user!.id }
    })
  }

  // ** Side Effects
  if (createdAnnouncement) {
    router.push(`/management/announcement/edit/${createdAnnouncement.id}`)
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ManagementAnnouncementAddBreadcrumbs
            pageLevels={[{ title: '公告管理', href: '/management/announcement/list' }, { title: '建立公告' }]}
          />
        </Grid>
        <Grid item xl={9} md={8} xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='h6'>標題</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='displayName'
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
                          error={Boolean(errors.displayName)}
                        />
                      )}
                    />
                    {errors.displayName && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.displayName.message}</FormHelperText>
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
                      onEditorStateChange={content => setContent(content)}
                      toolbar={{
                        options: [
                          'history',
                          'blockType',
                          'inline',
                          'colorPicker',
                          'link',
                          'textAlign',
                          'list',
                          'image',
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
              <Card>
                <CardContent>
                  <LoadingButton
                    fullWidth
                    loading={isCreateNewAnnouncementLoading}
                    disabled={Boolean(errors.displayName)}
                    type='submit'
                    variant='contained'
                    endIcon={<Icon icon='mdi:send-outline' />}
                  >
                    建立
                  </LoadingButton>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <ManagementAnnouncementAddInformationCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

ManagementAnnouncementAddPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementAnnouncementAddPage
