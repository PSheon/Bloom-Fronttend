// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

// ** Third-Party Components
import { useSession } from 'next-auth/react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const MeAccountOverviewSocialAccountCard = () => {
  // ** Hooks
  const session = useSession()

  // ** Vars
  const currentProvider = (session.data?.user.provider ?? '').toLowerCase()
  const PROVIDER_LIST = ['google', 'facebook', 'discord', 'microsoft']

  return (
    <Card>
      <CardHeader title='Social Accounts' />
      <CardContent>
        <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
          {PROVIDER_LIST.map(provider => (
            <Stack
              key={`provider-${provider}`}
              direction='row'
              spacing={4}
              alignSelf='stretch'
              alignItems='center'
              justifyContent='center'
            >
              <Stack alignItems='center' justifyContent='center'>
                <Image src={`/images/socials/${provider}.png`} alt={`${provider} account`} width={32} height={32} />
              </Stack>
              <Stack alignItems='flex-start' justifyContent='center'>
                <Typography component='p' sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
                  {provider}
                </Typography>
                <Typography variant='body2' component='p' color='text.disabled'>
                  {currentProvider === provider ? 'Connected' : 'Not Connected'}
                </Typography>
              </Stack>
              <Stack flex='1' alignItems='flex-end' justifyContent='center'>
                {currentProvider === provider ? (
                  <Button variant='outlined' sx={{ p: 1.5, minWidth: 38 }} color='success'>
                    <Icon icon='mdi:link' />
                  </Button>
                ) : (
                  <Button variant='outlined' sx={{ p: 1.5, minWidth: 38 }} color='primary' disabled>
                    <Icon icon='mdi:link-off' />
                  </Button>
                )}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MeAccountOverviewSocialAccountCard
