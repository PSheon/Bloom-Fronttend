// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Alert from '@mui/material/Alert'

// ** Third-Party Imports
import { useAccount } from 'wagmi'
import { mainnet } from 'wagmi/chains'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Type Imports
import type { AlertProps } from '@mui/material/Alert'

// ** Styled components
const StyledAlert = styled(Alert)<AlertProps>(({ theme }) => ({
  marginBottom: theme.spacing(4)
}))

const WalletNetworkAlert = () => {
  // ** States
  const [isShow, setIsShow] = useState<boolean>(true)

  // ** Hooks
  const walletAccount = useAccount()

  // ** Vars
  const isInProduction = process.env.NEXT_PUBLIC_FRONTEND_URL === 'https://app.buxx.finance'
  const isUsingMainnetNetwork = walletAccount.isConnected && walletAccount.chainId === mainnet.id

  // ** Logics
  const handleClose = () => setIsShow(() => false)

  if (isInProduction) {
    return (
      isShow &&
      !isUsingMainnetNetwork && (
        <StyledAlert severity='info' onClose={handleClose}>
          {`You're viewing data from the main network, but your wallet is connected to the test network. To use ${themeConfig.templateName}, please
          switch to `}
          <Link href='https://stage.buxx.finance' target='_blank'>
            https://stage.buxx.finance
          </Link>
        </StyledAlert>
      )
    )
  }

  return (
    isShow &&
    isUsingMainnetNetwork && (
      <StyledAlert severity='info' onClose={handleClose}>
        {`You're viewing data from the test network, but your wallet is connected to the main network. To use ${themeConfig.templateName}, please switch to `}
        <Link href='https://app.buxx.finance' target='_blank'>
          https://app.buxx.finance
        </Link>
      </StyledAlert>
    )
  )
}

export default WalletNetworkAlert
