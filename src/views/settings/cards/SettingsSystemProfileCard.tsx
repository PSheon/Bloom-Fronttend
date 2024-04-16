// ** MUI Imports
import { styled, darken } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import LogoImage from 'src/views/shared/LogoImage'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Styled Preview Box Component
const RootPreviewBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  position: 'relative',
  padding: theme.spacing(2),
  height: theme.spacing(64),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  background: darken(theme.palette.background.paper, 0.1),
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: 10
  }
}))

const SettingsSystemProfileCard = () => {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <RootPreviewBox>
          <Box
            sx={{
              width: 128,
              height: 128,
              mb: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LogoImage width={96} height={96} />
          </Box>
        </RootPreviewBox>
        <Typography variant='h6' sx={{ mt: 4, mb: 2 }}>
          {themeConfig.templateName}
        </Typography>
        <CustomChip
          skin='light'
          size='small'
          label='服務中'
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

      <CardContent sx={{ my: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
              <Icon icon='mdi:language' />
            </CustomAvatar>
            <Box>
              <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                繁體中文
              </Typography>
              <Typography variant='body2'>語言</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' variant='rounded' color='info' sx={{ mr: 3 }}>
              <Icon icon='mdi:timezone-outline' />
            </CustomAvatar>
            <Box>
              <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                GMT+8
              </Typography>
              <Typography variant='body2'>時區</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>

      <CardContent>
        <Typography variant='subtitle2'>系統資料</Typography>
        <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
        <Box sx={{ pt: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              版本:
            </Typography>
            <Typography variant='body2'>v0.1.0</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              API 版本:
            </Typography>
            <Typography variant='body2'>v0.1.0</Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 2.7 }}>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
              Socket 版本:
            </Typography>
            <Typography variant='body2'>v0.1.0</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default SettingsSystemProfileCard
