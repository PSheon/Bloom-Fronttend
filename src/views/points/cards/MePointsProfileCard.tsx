// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

const MePointsProfileCard = () => {
  return (
    <Card>
      <CardContent
        sx={{ pt: 15, position: 'relative', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0 }}>
          <Image width={150} height={75} src='/images/points/profile-deco-left.svg' alt='deco left' />
        </Box>
        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
          <Image width={150} height={70} src='/images/points/profile-deco-right.svg' alt='deco right' />
        </Box>

        <CustomAvatar
          src='/images/avatars/4.png'
          variant='rounded'
          alt='Daisy Patterson'
          sx={{ width: 120, height: 120, fontWeight: 600 }}
        />

        <Typography variant='h6' sx={{ mt: 4, mb: 2 }}>
          Digital Stars
        </Typography>
        <CustomChip
          skin='light'
          size='small'
          label='啟用中'
          color='success'
          sx={{
            height: 20,
            fontWeight: 600,
            borderRadius: '5px',
            fontSize: '0.875rem',
            textTransform: 'capitalize',
            '& .MuiChip-label': { mt: -0.25 }
          }}
        />
      </CardContent>

      <CardContent>
        <Typography variant='subtitle2'>升級任務</Typography>
        <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
        <Box sx={{ pt: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              自身綁定
            </Typography>
            <Typography variant='body2'>15,000</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              有效直推
            </Typography>
            <Typography variant='body2'>12 位</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              直推去中心化精英
            </Typography>
            <Typography variant='body2'> 3 人</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              直推有效綁定
            </Typography>
            <Typography variant='body2'>90,000</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              團隊有效綁定
            </Typography>
            <Typography variant='body2'>450,000</Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button disabled fullWidth variant='contained'>
          細節
        </Button>
      </CardActions>
    </Card>
  )
}

export default MePointsProfileCard
