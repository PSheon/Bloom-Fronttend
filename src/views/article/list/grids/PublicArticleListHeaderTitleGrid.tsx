// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

interface Props {
  filteredCategory: string
}

const PublicArticleListHeaderTitleGrid = (props: Props) => {
  // ** Props
  const { filteredCategory } = props

  return (
    <Grid item xs={12} sx={{ mt: 6, mb: { xs: 6, md: 8 } }}>
      <Typography variant='h3' sx={{ fontWeight: 600, lineHeight: 1.17, textTransform: 'capitalize' }}>
        {filteredCategory}
      </Typography>
    </Grid>
  )
}

export default PublicArticleListHeaderTitleGrid
