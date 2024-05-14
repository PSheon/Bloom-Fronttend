// ** Third-Party Imports
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { QueryClient } from '@tanstack/react-query'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

export const wagmiConfig = getDefaultConfig({
  appName: themeConfig.templateName,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_RTHEREUM_MAINNET_KEY}`),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_RTHEREUM_SEPOLIA_KEY}`)
  },
  ssr: true
})

export const queryClient = new QueryClient()

// ** Token ABI
export const ETHEREUM_SEPOLIA_BLT_ABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_contractName',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_contractSymbol',
        type: 'string'
      },
      {
        internalType: 'uint8',
        name: '_contractPrecision',
        type: 'uint8'
      },
      {
        internalType: 'address',
        name: '_Admin',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_rootSigner',
        type: 'address'
      },
      {
        internalType: 'contract IERC20',
        name: '_paytoken',
        type: 'address'
      },
      {
        internalType: 'string',
        name: '_initBaseContractURI',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_initBaseSlotURI',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_initBaseTokenURI',
        type: 'string'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'ECDSAInvalidSignature',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'length',
        type: 'uint256'
      }
    ],
    name: 'ECDSAInvalidSignatureLength',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32'
      }
    ],
    name: 'ECDSAInvalidSignatureS',
    type: 'error'
  },
  {
    inputs: [],
    name: 'Insufficient',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'OwnableInvalidOwner',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error'
  },
  {
    inputs: [],
    name: 'ReentrancyGuardReentrantCall',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'length',
        type: 'uint256'
      }
    ],
    name: 'StringsInsufficientHexLength',
    type: 'error'
  },
  {
    inputs: [],
    name: 'Unauthorized',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_approved',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_operator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: '_approved',
        type: 'bool'
      }
    ],
    name: 'ApprovalForAll',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_operator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'ApprovalValue',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'metadataDescriptor',
        type: 'address'
      }
    ],
    name: 'SetMetadataDescriptor',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_oldSlot',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_newSlot',
        type: 'uint256'
      }
    ],
    name: 'SlotChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_to',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: '_fromTokenId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_toTokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'TransferValue',
    type: 'event'
  },
  {
    stateMutability: 'payable',
    type: 'fallback'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'operator_',
        type: 'address'
      }
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to_',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256'
      }
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'to_',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'value_',
        type: 'uint256'
      }
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner_',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'baseContractURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'baseSlotURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'baseTokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'contractURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'currentPhaseMaxMintPerAddress',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'currentPhaseMaxSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'currentPhasePrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'extension',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256'
      }
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'initialized',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner_',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'operator_',
        type: 'address'
      }
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'metadataDescriptor',
    outputs: [
      {
        internalType: 'contract IERC3525MetadataDescriptor',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_signature',
        type: 'bytes'
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_slot',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'mintPackage',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_slot',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'mintPackageForUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256'
      }
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: 'owner_',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'paytoken',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from_',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to_',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256'
      }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from_',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to_',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'data_',
        type: 'bytes'
      }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator_',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'approved_',
        type: 'bool'
      }
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_newBaseContractURI',
        type: 'string'
      }
    ],
    name: 'setBaseContractURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_newBaseSlotURI',
        type: 'string'
      }
    ],
    name: 'setBaseSlotURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_newBaseTokenURI',
        type: 'string'
      }
    ],
    name: 'setBaseTokenURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_newExtension',
        type: 'string'
      }
    ],
    name: 'setExtension',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: '_newPayToken',
        type: 'address'
      }
    ],
    name: 'setPayToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_newRootSigner',
        type: 'address'
      }
    ],
    name: 'setRootSigner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256'
      }
    ],
    name: 'slotOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'slot_',
        type: 'uint256'
      }
    ],
    name: 'slotURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index_',
        type: 'uint256'
      }
    ],
    name: 'tokenByIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner_',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'index_',
        type: 'uint256'
      }
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256'
      }
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'fromTokenId_',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'to_',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'value_',
        type: 'uint256'
      }
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'uint256',
        name: 'newTokenId',
        type: 'uint256'
      }
    ],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from_',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to_',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256'
      }
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'fromTokenId_',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'toTokenId_',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'value_',
        type: 'uint256'
      }
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'valueDecimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      }
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
] as const
