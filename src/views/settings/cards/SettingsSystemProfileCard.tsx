// ** MUI Imports
import { styled, darken } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third-Party Imports
import { useTranslation } from 'react-i18next'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import LogoImage from 'src/views/shared/LogoImage'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'
import packageConfig from 'package.json'

// ** Type Imports
import type { BoxProps } from '@mui/material/Box'

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
  // ** Hooks
  const { t } = useTranslation()

  return (
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <RootPreviewBox>
          <Stack
            alignItems='center'
            justifyContent='center'
            sx={{
              width: 128,
              height: 128,
              mb: 4
            }}
          >
            <LogoImage width={96} height={96} />
          </Stack>
        </RootPreviewBox>
        <Typography variant='h6' component='p' sx={{ mt: 4, mb: 2 }}>
          {themeConfig.templateName}
        </Typography>
        <CustomChip
          skin='light'
          size='small'
          label={t('general-settings::Profile.In Service')}
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

      <CardContent sx={{ my: 2 }}>
        <Stack direction='row' spacing={8} alignItems='center' justifyContent='center'>
          <Stack direction='row' spacing={4} alignItems='center'>
            <CustomAvatar skin='light' variant='rounded'>
              <Icon icon='mdi:language' />
            </CustomAvatar>
            <Stack>
              <Typography variant='h6' component='p' sx={{ lineHeight: 1.3 }}>
                English
              </Typography>
              <Typography variant='body2'>{t(`general-settings::Profile.Language`)}</Typography>
            </Stack>
          </Stack>
          <Stack direction='row' spacing={4} alignItems='center'>
            <CustomAvatar skin='light' variant='rounded' color='info'>
              <Icon icon='mdi:timezone-outline' />
            </CustomAvatar>
            <Stack>
              <Typography variant='h6' component='p' sx={{ lineHeight: 1.3 }}>
                GMT+8
              </Typography>
              <Typography variant='body2'>{t(`general-settings::Profile.Time Zone`)}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>

      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant='subtitle2' component='p'>
          {t(`general-settings::Profile.System Information`)}
        </Typography>
        <Stack alignSelf='stretch'>
          <Divider />
        </Stack>
        <Stack spacing={2.7}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' component='p' color='text.primary'>
              {`${t(`general-settings::Profile.Version`)} :`}
            </Typography>
            <Typography variant='body2'>{`v${packageConfig.version ?? '0.0.1'}`}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' component='p' color='text.primary'>
              {`${t(`general-settings::Profile.API Version`)} :`}
            </Typography>
            <Typography variant='body2'>{`v${packageConfig.version ?? '0.0.1'}`}</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' component='p' color='text.primary'>
              {`${t(`general-settings::Profile.Socket Version`)} :`}
            </Typography>
            <Typography variant='body2'>{`v${packageConfig.version ?? '0.0.1'}`}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SettingsSystemProfileCard
