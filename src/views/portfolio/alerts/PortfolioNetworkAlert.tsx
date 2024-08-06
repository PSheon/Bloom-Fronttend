// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Alert from '@mui/material/Alert'

// ** Third-Party Imports
import { useChainId } from 'wagmi'
import { mainnet } from 'wagmi/chains'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

const PortfolioNetworkAlert = () => {
  // ** States
  const [isShow, setIsShow] = useState<boolean>(true)

  // ** Hooks
  const chainId = useChainId()

  // ** Vars
  const isInProduction = process.env.NEXT_PUBLIC_FRONTEND_URL === 'https://app.buxx.finance'
  const isUsingMainnetNetwork = chainId === mainnet.id

  // ** Logics
  const handleClose = () => setIsShow(() => false)

  if (isInProduction) {
    return (
      isShow &&
      !isUsingMainnetNetwork && (
        <Alert severity='info' onClose={handleClose}>
          {`You're viewing data from the main network, but your wallet is connected to the test network. To use ${themeConfig.templateName}, please
          switch to `}
          <Link href='https://stage.buxx.finance' target='_blank'>
            https://stage.buxx.finance
          </Link>
        </Alert>
      )
    )
  }

  return (
    isShow &&
    isUsingMainnetNetwork && (
      <Alert severity='info' onClose={handleClose}>
        {`You're viewing data from the test network, but your wallet is connected to the main network. To use ${themeConfig.templateName}, please switch to `}
        <Link href='https://app.buxx.finance' target='_blank'>
          https://app.buxx.finance
        </Link>
      </Alert>
    )
  )
}

export default PortfolioNetworkAlert
