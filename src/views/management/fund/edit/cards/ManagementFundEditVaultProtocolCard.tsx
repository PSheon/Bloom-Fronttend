// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'

// ** Third-Party Imports
import { useAccount, useReadContract } from 'wagmi'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import LogoImage from 'src/views/shared/LogoImage'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getChainId, getContractTypeProperties } from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ManagementFundEditVaultProtocolCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** Hooks
  const walletAccount = useAccount()

  const { data: contractType, isLoading: isContractTypeLoading } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.vault.contractAbi,
    address: initFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'contractType',
    args: [],
    account: walletAccount.address!,
    query: {
      refetchOnWindowFocus: false,
      placeholderData: ''
    }
  })

  const { data: contractVersion, isLoading: isContractVersionLoading } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.vault.contractAbi,
    address: initFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'contractVersion',
    args: [],
    account: walletAccount.address!,
    query: {
      refetchOnWindowFocus: false,
      placeholderData: ''
    }
  })

  // ** Vars
  const contractTypeProperties = getContractTypeProperties(contractType)

  return (
    <Card>
      <CardContent>
        <Stack spacing={6} alignItems='flex-start' justifyContent='center'>
          <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
            <Stack direction='row' spacing={2} alignItems='center'>
              <CustomChip
                skin='light'
                size='small'
                rounded
                color='success'
                label='Audited'
                sx={{ mr: 2.5, height: 20, fontSize: '0.75rem', fontWeight: 500 }}
              />
              {isContractVersionLoading || typeof contractVersion !== 'string' ? (
                <Skeleton variant='rounded' width={80} height={22} />
              ) : (
                <CustomChip
                  skin='light'
                  size='small'
                  rounded
                  color='primary'
                  label={contractVersion}
                  sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
                />
              )}
            </Stack>
            <Stack direction='row' alignItems='center'>
              <Typography variant='caption'>Source Code</Typography>
              <IconButton
                component={Link}
                href={`${walletAccount?.chain?.blockExplorers?.default.url}/address/${initFundEntity.vault.contractAddress}#code`}
                target='_blank'
              >
                <Icon icon='mdi:external-link' fontSize={16} />
              </IconButton>
            </Stack>
          </Stack>

          {isContractTypeLoading ? (
            <Stack spacing={4} alignItems='flex-start' justifyContent='center'>
              <Skeleton variant='text' width={140} height={32} />
              <Stack alignItems='flex-start' justifyContent='center'>
                <Skeleton variant='text' width={200} height={20} />
                <Skeleton variant='text' width={200} height={20} />
              </Stack>
            </Stack>
          ) : (
            <Stack spacing={4} alignItems='flex-start' justifyContent='center'>
              <Typography variant='h6' component='p'>
                {contractTypeProperties.displayName}
              </Typography>
              <Typography variant='body2' component='p'>
                {contractTypeProperties.description}
              </Typography>
            </Stack>
          )}

          <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
            <CustomAvatar
              sx={{
                height: 20,
                width: 20,
                borderWidth: '5px !important',
                backgroundColor: theme => theme.palette.background.default
              }}
            >
              <LogoImage width={20} height={20} />
            </CustomAvatar>

            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              Bloom DAO
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ManagementFundEditVaultProtocolCard
