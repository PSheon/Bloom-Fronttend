// ** Third-Party Imports
import { mainnet, sepolia, blast } from 'wagmi/chains'

// ** Config Imports
import { ETHEREUM_SEPOLIA_BLT_ABI } from 'src/configs/ethereum'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

export const getFormattedPriceUnit = (priceInUnit: number): string => {
  return new Intl.NumberFormat('en-US').format(priceInUnit)
}

export const getFormattedEthereumAddress = (address: string): string => {
  const isValidEthAddress = /^(0x)[0-9a-f]{40}$/i.test(address)

  if (isValidEthAddress) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  } else {
    return ''
  }
}

export const getChainId = (network: FundType['chain']): number => {
  switch (network) {
    case 'Ethereum Sepolia':
      return sepolia.id
    case 'Blast':
      return blast.id
    case 'Ethereum':
    default:
      return mainnet.id
  }
}

export const getBaseCurrencyABI = (
  network: FundType['chain'] = 'Ethereum',
  baseCurrency: FundType['baseCurrency'] = 'ETH'
) => {
  // ** NOTE: Fix here later
  const ABI_TABLE: Record<FundType['chain'], Record<FundType['baseCurrency'], any>> = {
    Ethereum: {
      ETH: ETHEREUM_SEPOLIA_BLT_ABI,
      USDT: ETHEREUM_SEPOLIA_BLT_ABI,
      USDC: ETHEREUM_SEPOLIA_BLT_ABI,
      DAI: ETHEREUM_SEPOLIA_BLT_ABI,
      BLT: ETHEREUM_SEPOLIA_BLT_ABI
    },
    'Ethereum Sepolia': {
      ETH: ETHEREUM_SEPOLIA_BLT_ABI,
      USDT: ETHEREUM_SEPOLIA_BLT_ABI,
      USDC: ETHEREUM_SEPOLIA_BLT_ABI,
      DAI: ETHEREUM_SEPOLIA_BLT_ABI,
      BLT: ETHEREUM_SEPOLIA_BLT_ABI
    },
    Blast: {
      ETH: ETHEREUM_SEPOLIA_BLT_ABI,
      USDT: ETHEREUM_SEPOLIA_BLT_ABI,
      USDC: ETHEREUM_SEPOLIA_BLT_ABI,
      DAI: ETHEREUM_SEPOLIA_BLT_ABI,
      BLT: ETHEREUM_SEPOLIA_BLT_ABI
    }
  }

  return ABI_TABLE[network][baseCurrency]
}
