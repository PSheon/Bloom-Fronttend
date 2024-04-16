// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third-Party Imports
import format from 'date-fns/format'

// ** Util Imports
import {
  getRequestSheetTypeAttributes,
  getRequestSheetOperationalMethodAttributes,
  getRequestSheetCooperationIndustriesAttributes
} from 'src/utils'

// ** Type Imports
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const DetailsCard = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>計畫類型</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size='small'
              value={getRequestSheetTypeAttributes(initRequestSheetEntity.type).displayName}
              fullWidth
              InputProps={{
                readOnly: true
              }}
            />
            {initRequestSheetEntity?.referenceCaseNumber && (
              <TextField
                size='small'
                value={initRequestSheetEntity.referenceCaseNumber}
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position='start'>案號：</InputAdornment>
                }}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle2'>辦理學校/機構</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size='small'
              value={initRequestSheetEntity.schoolOrInstitution}
              fullWidth
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle2'>計畫運作方式</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size='small'
              value={getRequestSheetOperationalMethodAttributes(initRequestSheetEntity.operationalMethod).displayName}
              fullWidth
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle2'>合作產業與類別</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size='small'
              value={
                getRequestSheetCooperationIndustriesAttributes(initRequestSheetEntity.cooperationIndustries).displayName
              }
              fullWidth
              InputProps={{
                readOnly: true
              }}
            />
            {initRequestSheetEntity?.cooperationIndustriesOthers && (
              <TextField
                size='small'
                value={initRequestSheetEntity.cooperationIndustriesOthers}
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position='start'>產業：</InputAdornment>
                }}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle2'>階段期程</Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={6} direction='row'>
              <TextField
                size='small'
                value={format(new Date(initRequestSheetEntity.programStartedAt), 'yyyy/MM/dd')}
                fullWidth
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField
                size='small'
                value={format(new Date(initRequestSheetEntity.programCompletedAt), 'yyyy/MM/dd')}
                fullWidth
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle2'>第一次入廠日期(正式員工)</Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={6} direction='row'>
              <TextField
                size='small'
                value={format(new Date(initRequestSheetEntity.firstEntryAt), 'yyyy/MM/dd')}
                fullWidth
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default DetailsCard
