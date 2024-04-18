// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const PublicFundListPinnedGrid = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          Discover what's newSee
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>Pinned Card #1</CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>Pinned Card #2</CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PublicFundListPinnedGrid
