// ** MUI Imports
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

// ** Third-Party Imports
import { useAccount, useReadContract } from 'wagmi'
import { zeroHash, keccak256, stringToBytes } from 'viem'

// ** Custom Component Imports
import ManagementFundEditTokenPermissionListItemSkeleton from 'src/views/management/fund/edit/cards/token-permissions/ManagementFundEditTokenPermissionListItemSkeleton'
import ManagementFundEditTokenPermissionListItem from 'src/views/management/fund/edit/cards/token-permissions/ManagementFundEditTokenPermissionListItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getChainId } from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ManagementFundEditVaultPermissionsCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** Hooks
  const walletAccount = useAccount()

  const { data: adminRoleMemberCount, isLoading: isAdminRoleMemberCountLoading } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.vault.contractAbi,
    address: initFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'getRoleMemberCount',
    args: [zeroHash],
    account: walletAccount.address!,
    query: {
      refetchOnWindowFocus: false
    }
  })

  const { data: assetManagerRoleMemberCount, isLoading: isAssetManagerRoleMemberCountLoading } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.vault.contractAbi,
    address: initFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'getRoleMemberCount',
    args: [keccak256(stringToBytes('ASSET_MANAGER_ROLE'))],
    account: walletAccount.address!,
    query: {
      refetchOnWindowFocus: false
    }
  })

  return (
    <Card>
      <CardHeader title='Permissions' />
      <CardContent>
        <Stack spacing={4} alignItems='center' justifyContent='column'>
          <Stack spacing={2} alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
            <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Admin
              </Typography>
              <Tooltip title='Manage contract role permission'>
                <IconButton>
                  <Icon icon='mdi:about-circle-outline' fontSize={16} />
                </IconButton>
              </Tooltip>
            </Stack>

            {isAdminRoleMemberCountLoading || typeof adminRoleMemberCount !== 'bigint'
              ? [...Array(3).keys()].map(index => (
                  <ManagementFundEditTokenPermissionListItemSkeleton key={`admin-role-skeleton-${index}`} />
                ))
              : [...Array(adminRoleMemberCount).keys()].map(roleIndex => (
                  <ManagementFundEditTokenPermissionListItem
                    key={`admin-role-${roleIndex}`}
                    initFundEntity={initFundEntity}
                    roleHash={zeroHash as string}
                    roleIndex={roleIndex}
                  />
                ))}
          </Stack>

          <Stack spacing={2} alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
            <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Asset Manager
              </Typography>
              <Tooltip title='Manage contract assets'>
                <IconButton>
                  <Icon icon='mdi:about-circle-outline' fontSize={16} />
                </IconButton>
              </Tooltip>
            </Stack>

            {isAssetManagerRoleMemberCountLoading || typeof assetManagerRoleMemberCount !== 'bigint'
              ? [...Array(3).keys()].map(index => (
                  <ManagementFundEditTokenPermissionListItemSkeleton key={`asset-manager-role-skeleton-${index}`} />
                ))
              : [...Array(adminRoleMemberCount).keys()].map(roleIndex => (
                  <ManagementFundEditTokenPermissionListItem
                    key={`asset-manager-role-${roleIndex}`}
                    initFundEntity={initFundEntity}
                    roleHash={keccak256(stringToBytes('ASSET_MANAGER_ROLE'))}
                    roleIndex={roleIndex}
                  />
                ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ManagementFundEditVaultPermissionsCard
