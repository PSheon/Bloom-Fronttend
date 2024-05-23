// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import PortfolioOwnedSFTSkeletonCard from 'src/views/portfolio/cards/me-positions/PortfolioOwnedSFTSkeletonCard'

// TODO: Fill here later
const PortfolioMePositionsGrid = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      {[...Array(3).keys()].map(index => (
        <Grid key={`portfolio-position-skeleton-${index}`} item xs={12} sm={6} md={4}>
          <PortfolioOwnedSFTSkeletonCard />
        </Grid>
      ))}
    </Grid>
  )
}

export default PortfolioMePositionsGrid
