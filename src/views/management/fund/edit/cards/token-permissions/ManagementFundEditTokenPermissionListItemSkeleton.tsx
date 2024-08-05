// ** MUI Imports
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'

const ManagementFundEditTokenPermissionListItemSkeleton = () => {
  return (
    <Stack direction='row' spacing={2} alignSelf='stretch' alignItems='center' justifyContent='space-between'>
      <Skeleton variant='rounded' width={40} height={40} />
      <Skeleton variant='text' sx={{ flex: 1 }} />
    </Stack>
  )
}

export default ManagementFundEditTokenPermissionListItemSkeleton
