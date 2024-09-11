// ** MUI Imports
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

// ** Third-Party Imports
import { useAccount, useReadContract } from 'wagmi'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getChainId } from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { DVFundType } from 'src/types/dvFundTypes'

const DEFAULT_ADMIN_ROLE_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000'
const ASSET_MANAGER_ROLE_HASH = '0xb1fadd3142ab2ad7f1337ea4d97112bcc8337fc11ce5b20cb04ad038adf99819'

interface Props {
  initDVFundEntity: DVFundType
}

const ManagementFundDefiVaultEditOverviewVaultPermissionCard = (props: Props) => {
  // ** Props
  const { initDVFundEntity } = props

  // ** Hooks
  const walletAccount = useAccount()

  const {
    data: vaultAdminAddress,
    refetch: refetchVaultAdminAddress,
    isLoading: isVaultAdminAddressLoading,
    isFetching: isVaultAdminAddressFetching
  } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initDVFundEntity.vault.contractAbi,
    address: initDVFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'getRoleMember',
    args: [DEFAULT_ADMIN_ROLE_HASH, 0],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected',
      placeholderData: DEFAULT_ADMIN_ROLE_HASH
    }
  })

  const {
    data: vaultAdminMembersCount,
    refetch: refetchVaultAdminMembersCount,
    isLoading: isVaultAdminMembersCountLoading,
    isFetching: isVaultAdminMembersCountFetching
  } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initDVFundEntity.vault.contractAbi,
    address: initDVFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'getRoleMemberCount',
    args: [DEFAULT_ADMIN_ROLE_HASH],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected',
      placeholderData: 0n
    }
  })

  const {
    data: vaultAssetManagerMembersCount,
    refetch: refetchVaultAssetManagerMembersCount,
    isLoading: isVaultAssetManagerMembersCountLoading,
    isFetching: isVaultAssetManagerMembersCountFetching
  } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initDVFundEntity.vault.contractAbi,
    address: initDVFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'getRoleMemberCount',
    args: [ASSET_MANAGER_ROLE_HASH],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected',
      placeholderData: 0n
    }
  })

  // ** Logics
  const handleReloadVaultPermission = () => {
    refetchVaultAdminAddress()
    refetchVaultAdminMembersCount()
    refetchVaultAssetManagerMembersCount()
  }

  return (
    <Card>
      <CardHeader
        title='Permission'
        action={
          <Button
            variant='outlined'
            color='secondary'
            onClick={handleReloadVaultPermission}
            sx={{ p: 1.5, minWidth: 38 }}
          >
            <Icon icon='mdi:reload' fontSize={20} />
          </Button>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Stack direction='row' spacing={6} alignItems='center'>
              <CustomAvatar skin='light' variant='rounded' color='primary'>
                <Icon icon='mdi:safe' />
              </CustomAvatar>
              <Stack>
                {isVaultAdminAddressLoading || isVaultAdminAddressFetching ? (
                  <Stack alignItems='center' justifyContent='center'>
                    <Skeleton variant='text' width={100} height={32} />
                  </Stack>
                ) : (
                  <Typography variant='h6' component='p' sx={{ fontWeight: 600 }}>
                    {`Admin ${typeof vaultAdminAddress === 'string' ? vaultAdminAddress : 'N/A'}`}
                  </Typography>
                )}
                {isVaultAdminMembersCountLoading || isVaultAdminMembersCountFetching ? (
                  <Stack alignItems='center' justifyContent='center'>
                    <Skeleton variant='text' width={100} height={15} />
                  </Stack>
                ) : (
                  <Typography variant='caption'>{`${vaultAdminMembersCount} members`}</Typography>
                )}
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack direction='row' spacing={6} alignItems='center'>
              <CustomAvatar skin='light' variant='rounded' color='primary'>
                <Icon icon='mdi:safe' />
              </CustomAvatar>
              <Stack>
                <Typography variant='h6' component='p' sx={{ fontWeight: 600 }}>
                  Asset Manager
                </Typography>
                {isVaultAssetManagerMembersCountLoading || isVaultAssetManagerMembersCountFetching ? (
                  <Stack alignItems='center' justifyContent='center'>
                    <Skeleton variant='text' width={100} height={15} />
                  </Stack>
                ) : (
                  <Typography variant='caption'>{`${vaultAssetManagerMembersCount} members`}</Typography>
                )}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ManagementFundDefiVaultEditOverviewVaultPermissionCard
