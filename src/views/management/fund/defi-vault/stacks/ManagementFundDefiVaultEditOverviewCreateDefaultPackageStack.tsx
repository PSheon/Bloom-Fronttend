// ** MUI Imports
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const ManagementFundDefiVaultEditOverviewCreateDefaultPackageStack = () => {
  return (
    <Stack direction='row' spacing={4} alignItems='center'>
      <Stack flex='1'>
        <Typography variant='h5' component='p'>
          Packages
        </Typography>
        <Typography variant='body2' component='p'>
          Provide a solution for investors to understand how the fund works with their funds
        </Typography>
      </Stack>
      <Stack>
        <Button variant='contained' disabled>
          New
        </Button>
      </Stack>
    </Stack>
  )
}

export default ManagementFundDefiVaultEditOverviewCreateDefaultPackageStack
