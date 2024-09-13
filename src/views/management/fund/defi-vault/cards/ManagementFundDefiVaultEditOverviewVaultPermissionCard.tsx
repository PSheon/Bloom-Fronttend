// ** MUI Imports
import Box from '@mui/material/Box'
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
import { getChainId, getGradientColors } from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { DVFundType } from 'src/types/dvFundTypes'

const DEFAULT_ADMIN_ROLE_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000'
const ASSET_MANAGER_ROLE_HASH = '0xb1fadd3142ab2ad7f1337ea4d97112bcc8337fc11ce5b20cb04ad038adf99819'

interface Props {
  initDVFundEntity: DVFundType
}

const AddressListItem = (props: { initDVFundEntity: DVFundType; roleHash: string; roleIndex: number }) => {
  // ** Props
  const { initDVFundEntity, roleHash, roleIndex } = props

  // ** Hooks
  const walletAccount = useAccount()

  const {
    data: vaultAddress,
    isLoading: isAdminAddressLoading,
    isFetching: isAdminAddressFetching
  } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initDVFundEntity.vault.contractAbi,
    address: initDVFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'getRoleMember',
    args: [roleHash, roleIndex],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected',
      placeholderData: '0x0'
    }
  })

  // ** Renders
  const renderWalletAvatar = (address: string) => {
    const colors = getGradientColors(address)

    return (
      <CustomAvatar
        skin='light'
        sx={{
          width: 36,
          height: 36,
          boxShadow: `${colors[0]} 0px 3px 5px`
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            backgroundColor: colors[0],
            backgroundImage: `
              radial-gradient(at 66% 77%, ${colors[1]} 0px, transparent 50%),
              radial-gradient(at 29% 97%, ${colors[2]} 0px, transparent 50%),
              radial-gradient(at 99% 86%, ${colors[3]} 0px, transparent 50%),
              radial-gradient(at 29% 88%, ${colors[4]} 0px, transparent 50%)
            `
          }}
        />
      </CustomAvatar>
    )
  }

  if (isAdminAddressLoading || isAdminAddressFetching) {
    return (
      <Stack direction='row' spacing={4} alignItems='center'>
        <Skeleton variant='circular' width={36} height={36} />
        <Stack>
          <Skeleton variant='text' width={100} height={32} />
          <Skeleton variant='text' width={100} height={15} />
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack direction='row' spacing={6} alignItems='center'>
      {renderWalletAvatar(vaultAddress as string)}
      <Stack>
        <Typography variant='body1' color='text.primary' sx={{ fontWeight: 600 }}>
          {vaultAddress as string}
        </Typography>
        <Typography variant='caption' color='text.secondary'>
          {`Member #${roleIndex + 1}`}
        </Typography>
      </Stack>
    </Stack>
  )
}

const ManagementFundDefiVaultEditOverviewVaultPermissionCard = (props: Props) => {
  // ** Props
  const { initDVFundEntity } = props

  // ** Hooks
  const walletAccount = useAccount()

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
                <Icon icon='mdi:shield-person-outline' />
              </CustomAvatar>
              <Stack>
                <Typography variant='h6' component='p' sx={{ fontWeight: 600 }}>
                  Admin
                </Typography>
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
            {isVaultAdminMembersCountLoading || isVaultAdminMembersCountFetching
              ? [...Array(3).keys()].map(index => {
                  return (
                    <Stack key={`role-admin-skeleton-${index}`} direction='row' spacing={4} alignItems='center'>
                      <Skeleton variant='circular' width={36} height={36} />
                      <Stack>
                        <Skeleton variant='text' width={100} height={32} />
                        <Skeleton variant='text' width={100} height={15} />
                      </Stack>
                    </Stack>
                  )
                })
              : typeof vaultAdminMembersCount === 'bigint'
                ? [...Array(Number(vaultAdminMembersCount)).keys()].map(index => {
                    return (
                      <AddressListItem
                        key={`role-admin-${index}`}
                        initDVFundEntity={initDVFundEntity}
                        roleHash={DEFAULT_ADMIN_ROLE_HASH}
                        roleIndex={index}
                      />
                    )
                  })
                : null}
          </Grid>

          <Grid item xs={12}>
            <Stack direction='row' spacing={6} alignItems='center'>
              <CustomAvatar skin='light' variant='rounded' color='primary'>
                <Icon icon='mdi:shield-person-outline' />
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

          <Grid item xs={12}>
            {isVaultAssetManagerMembersCountLoading || isVaultAssetManagerMembersCountFetching
              ? [...Array(3).keys()].map(index => {
                  return (
                    <Stack key={`role-asset-manager-skeleton-${index}`} direction='row' spacing={4} alignItems='center'>
                      <Skeleton variant='circular' width={36} height={36} />
                      <Stack>
                        <Skeleton variant='text' width={100} height={32} />
                        <Skeleton variant='text' width={100} height={15} />
                      </Stack>
                    </Stack>
                  )
                })
              : typeof vaultAssetManagerMembersCount === 'bigint'
                ? [...Array(Number(vaultAssetManagerMembersCount)).keys()].map(index => {
                    return (
                      <AddressListItem
                        key={`role-asset-manager-${index}`}
                        initDVFundEntity={initDVFundEntity}
                        roleHash={ASSET_MANAGER_ROLE_HASH}
                        roleIndex={index}
                      />
                    )
                  })
                : null}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ManagementFundDefiVaultEditOverviewVaultPermissionCard
