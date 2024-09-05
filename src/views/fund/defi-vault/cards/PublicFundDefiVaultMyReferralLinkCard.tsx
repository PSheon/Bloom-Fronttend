// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'

// ** Third-Party Components
import { useAccount } from 'wagmi'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

/* TODO: Fix here later */
const PublicFundDefiVaultMyReferralLinkCard = () => {
  // ** States
  const [copyReferralLinkSuccess, setCopyReferralLinkSuccess] = useState<boolean>(false)

  // ** Hooks
  const walletAccount = useAccount()

  // ** Vars
  const referralLink = `${window.location.origin}/fund/live/defi-vault?referrer=${walletAccount.address}`

  // ** Logics
  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopyReferralLinkSuccess(true)
    setTimeout(() => {
      setCopyReferralLinkSuccess(false)
    }, 3000)
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2.7} justifyContent='center'>
          <Stack spacing={2} alignSelf='stretch'>
            <Typography variant='subtitle2'>Invitation link</Typography>
            <Divider />
          </Stack>
          <Stack spacing={2}>
            <Typography component='span' color='text.secondary'>
              Copy and share this link to invite your friends to deposit the vault.
            </Typography>
            <Stack direction='row' spacing={4} alignItems='center'>
              <TextField
                fullWidth
                size='small'
                id='refer-link'
                placeholder='0x0'
                value={referralLink}
                inputProps={{ readOnly: true }}
              />
              <Button variant='outlined' onClick={handleCopyReferralLink} sx={{ p: 1.5, minWidth: 38, minHeight: 38 }}>
                <Icon icon={copyReferralLinkSuccess ? 'mdi:check-outline' : 'mdi:content-copy'} fontSize={16} />
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PublicFundDefiVaultMyReferralLinkCard
