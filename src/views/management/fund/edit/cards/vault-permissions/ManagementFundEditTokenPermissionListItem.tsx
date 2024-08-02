// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'

// ** Third-Party Imports
import { useAccount, useReadContract } from 'wagmi'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getChainId, getFormattedEthereumAddress } from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
  roleHash: string
  roleIndex: number
}

const ManagementFundEditVaultPermissionListItem = (props: Props) => {
  // ** Props
  const { initFundEntity, roleHash, roleIndex } = props

  // ** States
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false)

  // ** Hooks
  const walletAccount = useAccount()

  const { data: adminRoleAccount, isLoading: isAdminRoleAccountLoading } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.vault.contractAbi,
    address: initFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'getRoleMember',
    args: [roleHash, roleIndex],
    account: walletAccount.address!,
    query: {
      refetchOnWindowFocus: false
    }
  })

  // ** Logics
  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setIsAddressCopied(() => true)
    setTimeout(() => {
      setIsAddressCopied(() => false)
    }, 2 * 1000)
  }

  return (
    <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
      <Stack direction='row' spacing={4} alignSelf='stretch' alignItems='center' justifyContent='center'>
        <CustomAvatar skin='light' color='success' variant='rounded' sx={{ mr: 3 }}>
          <Image alt='credit-card' src='/images/cards/credit-card.png' width={22.5} height={18} />
        </CustomAvatar>
        {isAdminRoleAccountLoading || typeof adminRoleAccount !== 'string' ? (
          <Skeleton variant='text' />
        ) : (
          <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
            {getFormattedEthereumAddress(adminRoleAccount)}
          </Typography>
        )}
      </Stack>
      <Stack justifyContent='center'>
        <IconButton size='small' onClick={() => handleCopyAddress(adminRoleAccount as string)}>
          <Icon icon={isAddressCopied ? 'mdi:check-bold' : 'mdi:content-copy'} fontSize={16} />
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default ManagementFundEditVaultPermissionListItem
