// ** Third-Party Imports
import { mainnet, sepolia, blast } from 'wagmi/chains'

// ** Config Imports
import { ETHEREUM_SEPOLIA_BLT_ABI } from 'src/configs/ethereum'

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

export const getBaseCurrencyAddress = (
  network: FundType['chain'] = 'Ethereum',
  baseCurrency: FundType['baseCurrency'] = 'ETH'
): `0x${string}` => {
  // ** NOTE: Fix here later
  const ADDRESS_TABLE: Record<FundType['chain'], Record<FundType['baseCurrency'], any>> = {
    Ethereum: {
      ETH: '0xF18aee3E71900DBF44eceC8415622f1Fb6E62E17',
      USDT: '0xF18aee3E71900DBF44eceC8415622f1Fb6E62E17',
      USDC: '0xF18aee3E71900DBF44eceC8415622f1Fb6E62E17',
      DAI: '0xF18aee3E71900DBF44eceC8415622f1Fb6E62E17',
      BLT: '0xF18aee3E71900DBF44eceC8415622f1Fb6E62E17'
    },
    'Ethereum Sepolia': {
      ETH: '0xF18aee3E71900DBF44eceC8415622f1Fb6E62E17',
      USDT: '0xF18aee3E71900DBF44eceC8415622f1Fb6E62E17',
      USDC: '0xF18aee3E71900DBF44eceC8415622f1Fb6E62E17',
      DAI: '0xF18aee3E71900DBF44eceC8415622f1Fb6E62E17',
      BLT: '0xF18aee3E71900DBF44eceC8415622f1Fb6E62E17'
    },
    Blast: {
      ETH: '0xF18aee3E71900DBF44eceC8415622f1Fb6E62E17',
      USDT: '0xF18aee3E71900DBF44eceC8415622f1Fb6E62E17',
      USDC: '0xF18aee3E71900DBF44eceC8415622f1Fb6E62E17',
      DAI: '0xF18aee3E71900DBF44eceC8415622f1Fb6E62E17',
      BLT: '0xF18aee3E71900DBF44eceC8415622f1Fb6E62E17'
    }
  }

  return ADDRESS_TABLE[network][baseCurrency]
}
