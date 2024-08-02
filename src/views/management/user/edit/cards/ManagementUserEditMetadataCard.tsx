// ** MUI Imports
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

// ** Third-Party Imports
import { format } from 'date-fns'

// ** Type Imports
import type { UserDataType } from 'src/types/authTypes'

interface Props {
  initUserEntity: UserDataType
}

const ManagementUserEditMetadataCard = (props: Props) => {
  // ** Props
  const { initUserEntity } = props

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2.7}>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>Metadata</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction='row'
              alignSelf='stretch'
              flexWrap='wrap'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                No.
              </Typography>
              <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
                {`# ${initUserEntity.id}`}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction='row'
              alignSelf='stretch'
              flexWrap='wrap'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Updated at
              </Typography>
              <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
                {format(new Date(initUserEntity.updatedAt), 'PPpp')}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction='row'
              alignSelf='stretch'
              flexWrap='wrap'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Created at
              </Typography>
              <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
                {format(new Date(initUserEntity.createdAt), 'PPpp')}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ManagementUserEditMetadataCard
