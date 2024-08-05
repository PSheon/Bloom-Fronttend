// ** MUI Imports
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Type Imports
import type { PrivilegeType } from 'src/configs/point'

interface Props {
  privileges: PrivilegeType[]
}

const MePointsLevelPrivilegesStack = (props: Props) => {
  // ** Props
  const { privileges } = props

  // ** Vars
  const privilegesData = privileges.filter(privilege => privilege.value > 0)

  if (privilegesData.length === 0) {
    return (
      <Stack spacing={4} alignItems='center' justifyContent='center'>
        <Stack direction='row' spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
          <Typography variant='subtitle2' color='text.primary' sx={{ fontWeight: 600 }}>
            Upgrade to unlock privileges
          </Typography>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack spacing={4} alignItems='center' justifyContent='center'>
      {privilegesData.map((privilege, index) => (
        <Stack
          key={`privilege-${index}`}
          direction='row'
          spacing={2}
          alignSelf='stretch'
          alignItems='center'
          justifyContent='space-between'
        >
          <Stack direction='row' spacing={2} alignItems='center' justifyContent='flex-start'>
            <CustomAvatar
              color={privilege.color}
              skin='light'
              variant='rounded'
              alt={privilege.title}
              sx={{
                width: 24,
                height: 24,
                fontWeight: 600,
                filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
              }}
            >
              <Icon icon={privilege.icon} fontSize={18} />
            </CustomAvatar>
            <Typography variant='subtitle2' color='text.primary' sx={{ fontWeight: 600 }}>
              {privilege.title}
            </Typography>
          </Stack>

          <Stack direction='row' spacing={2} alignItems='center' justifyContent='flex-end' sx={{ flexBasis: 64 }}>
            <Typography variant='subtitle2' color='text.primary' sx={{ fontWeight: 600 }}>
              {privilege.displayValue}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}

export default MePointsLevelPrivilegesStack
