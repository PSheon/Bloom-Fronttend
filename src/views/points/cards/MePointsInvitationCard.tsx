// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// ** Third-Party Components
import { useSession } from 'next-auth/react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const MePointsInvitationCard = () => {
  // ** States
  const [copyReferralCodeSuccess, setCopyReferralCodeSuccess] = useState<boolean>(false)
  const [copyReferralLinkSuccess, setCopyReferralLinkSuccess] = useState<boolean>(false)

  // ** Hooks
  const session = useSession()

  // ** Vars
  const user = session.data?.user
  const referralCode = user!.referralCode
  const referralLink = `${window.location.origin}/points?referral-id=${user!.referralCode}`

  // ** Logics
  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopyReferralCodeSuccess(true)
    setTimeout(() => {
      setCopyReferralCodeSuccess(false)
    }, 3000)
  }

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopyReferralLinkSuccess(true)
    setTimeout(() => {
      setCopyReferralLinkSuccess(false)
    }, 3000)
  }

  return (
    <Card sx={{ boxShadow: 'none', border: theme => `2px solid ${theme.palette.primary.main}` }}>
      <CardContent>
        <Stack spacing={2.7} justifyContent='center'>
          <Box>
            <Typography variant='subtitle2'>Invitation link</Typography>
          </Box>
          <Box>
            <Divider />
          </Box>
          <Stack spacing={2}>
            <InputLabel
              htmlFor='refer-code'
              sx={{
                fontWeight: 600,
                fontSize: '0.75rem',
                lineHeight: '1.25rem',
                display: 'inline-flex',
                whiteSpace: 'break-spaces'
              }}
            >
              <Typography component='span' color='text.secondary'>
                Referral Code
              </Typography>
            </InputLabel>
            <Stack direction='row' spacing={4} alignItems='center'>
              <TextField fullWidth size='small' id='refer-code' placeholder='xxx-xxx' value={referralCode} />
              <Button variant='outlined' sx={{ p: 1.5, minWidth: 38 }} onClick={handleCopyReferralCode}>
                <Icon icon={copyReferralCodeSuccess ? 'mdi:check-outline' : 'mdi:content-copy'} />
              </Button>
            </Stack>
          </Stack>
          <Stack spacing={2}>
            <InputLabel
              htmlFor='refer-link'
              sx={{
                fontWeight: 600,
                fontSize: '0.75rem',
                lineHeight: '1.25rem',
                display: 'inline-flex',
                whiteSpace: 'break-spaces'
              }}
            >
              <Typography component='span' color='text.secondary'>
                Referral Link
              </Typography>
            </InputLabel>
            <Stack direction='row' spacing={4} alignItems='center'>
              <TextField fullWidth size='small' id='refer-link' placeholder='xxx-xxx' value={referralLink} />
              <Button variant='outlined' sx={{ p: 1.5, minWidth: 38 }} onClick={handleCopyReferralLink}>
                <Icon icon={copyReferralLinkSuccess ? 'mdi:check-outline' : 'mdi:content-copy'} />
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MePointsInvitationCard
