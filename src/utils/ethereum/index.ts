// ** Third-Party Imports
import { mainnet, sepolia, blast } from 'wagmi/chains'

// ** Config Imports
import {
  ETHEREUM_MAINNET_USDT_ABI,
  ETHEREUM_MAINNET_USDC_ABI,
  ETHEREUM_MAINNET_DAI_ABI,
  ETHEREUM_SEPOLIA_USDT_ABI,
  ETHEREUM_SEPOLIA_BLT_ABI
} from 'src/configs/ethereum'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

export function getGradientColors(address: string) {
  const seedArr = address.match(/.{1,7}/g)?.splice(0, 5)
  const colors: string[] = []

  seedArr?.forEach(seed => {
    let hash = 0

    for (let i = 0; i < seed.length; i += 1) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash)
      hash = hash & hash
    }

    const rgb = [0, 0, 0]

    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 255

      rgb[i] = value
    }

    colors.push(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`)
  })

  return colors
}

export const getFormattedPriceUnit = (priceInUnit: number | bigint): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(priceInUnit)
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
      ETH: ETHEREUM_SEPOLIA_BLT_ABI /* NOTE: check later */,
      USDT: ETHEREUM_MAINNET_USDT_ABI,
      USDC: ETHEREUM_MAINNET_USDC_ABI,
      DAI: ETHEREUM_MAINNET_DAI_ABI,
      BLT: ETHEREUM_SEPOLIA_BLT_ABI /* NOTE: check later */
    },
    'Ethereum Sepolia': {
      ETH: ETHEREUM_SEPOLIA_BLT_ABI /* NOTE: check later */,
      USDT: ETHEREUM_SEPOLIA_USDT_ABI,
      USDC: ETHEREUM_SEPOLIA_BLT_ABI /* NOTE: check later */,
      DAI: ETHEREUM_SEPOLIA_BLT_ABI /* NOTE: check later */,
      BLT: ETHEREUM_SEPOLIA_BLT_ABI
    },
    Blast: {
      ETH: ETHEREUM_SEPOLIA_BLT_ABI /* NOTE: check later */,
      USDT: ETHEREUM_SEPOLIA_BLT_ABI /* NOTE: check later */,
      USDC: ETHEREUM_SEPOLIA_BLT_ABI /* NOTE: check later */,
      DAI: ETHEREUM_SEPOLIA_BLT_ABI /* NOTE: check later */,
      BLT: ETHEREUM_SEPOLIA_BLT_ABI /* NOTE: check later */
    }
  }

  return ABI_TABLE[network][baseCurrency]
}

export const getBaseCurrencyAddress = (
  network: FundType['chain'] = 'Ethereum',
  baseCurrency: FundType['baseCurrency'] = 'ETH'
): `0x${string}` => {
  // ** NOTE: Fix here later
  const ADDRESS_TABLE: Record<FundType['chain'], Record<FundType['baseCurrency'], `0x${string}`>> = {
    Ethereum: {
      ETH: '0x0000000000000000000000000000000000000000',
      USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      BLT: '0x0000000000000000000000000000000000000000' /* NOTE: check later */
    },
    'Ethereum Sepolia': {
      ETH: '0x2a9fa8CDbF74Ec8Aa1A7DC7a054D16E363E4F41D',
      USDT: '0x8DE274A3cf4F4FD4A19d91b472A6fBBCe90b95a5',
      USDC: '0x6e454459356Cf2b884d4986C9aA46288E05C9553' /* NOTE: check later */,
      DAI: '0x6e454459356Cf2b884d4986C9aA46288E05C9553' /* NOTE: check later */,
      BLT: '0x6e454459356Cf2b884d4986C9aA46288E05C9553' /* NOTE: check later */
    },
    Blast: {
      ETH: '0x6e454459356Cf2b884d4986C9aA46288E05C9553' /* NOTE: check later */,
      USDT: '0x6e454459356Cf2b884d4986C9aA46288E05C9553' /* NOTE: check later */,
      USDC: '0x6e454459356Cf2b884d4986C9aA46288E05C9553' /* NOTE: check later */,
      DAI: '0x6e454459356Cf2b884d4986C9aA46288E05C9553' /* NOTE: check later */,
      BLT: '0x6e454459356Cf2b884d4986C9aA46288E05C9553' /* NOTE: check later */
    }
  }

  return ADDRESS_TABLE[network][baseCurrency]
}
