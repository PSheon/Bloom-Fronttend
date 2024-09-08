// ** MUI Imports
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Custom Component Imports
import PublicFundDefiVaultDepositInformationGrid from 'src/views/fund/defi-vault/grids/PublicFundDefiVaultDepositInformationGrid'
import PublicFundDefiVaultDefaultPackageGrid from 'src/views/fund/defi-vault/grids/PublicFundDefiVaultDefaultPackageGrid'

// ** Third-Party Imports
import { useAccount, useReadContract } from 'wagmi'
import { ExactNumber as N } from 'exactnumber'

// ** Util Imports
import { getChainId } from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { DVFundType } from 'src/types/dvFundTypes'

interface Props {
  initDVFundEntity: DVFundType
}

const PublicFundDefiVaultDepositCheckGrid = (props: Props) => {
  // ** Props
  const { initDVFundEntity } = props

  // ** Hooks
  const walletAccount = useAccount()

  const {
    data: meDepositInfo,
    isLoading: isMeDepositInfoLoading,
    isFetching: isMeDepositInfoFetching
  } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initDVFundEntity.vault.contractAbi,
    address: initDVFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'getDepositInfo',
    args: [walletAccount.address!],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected',
      placeholderData: [0n, 0n, 0n, 0n, 0n, 0n, 0n] as unknown as bigint[]
    }
  })

  // ** Vars
  const [amount] = meDepositInfo as bigint[]
  const hasDeposit = amount && N(amount).gt(0)

  if (isMeDepositInfoLoading || isMeDepositInfoFetching) {
    return (
      <Stack spacing={6} alignSelf='stretch' alignItems='center' justifyContent='center' sx={{ minHeight: 360 }}>
        <Typography variant='subtitle2' component='p'>
          Checking deposit...
        </Typography>
      </Stack>
    )
  } else if (hasDeposit) {
    return <PublicFundDefiVaultDepositInformationGrid initDVFundEntity={initDVFundEntity} />
  } else {
    return <PublicFundDefiVaultDefaultPackageGrid initDVFundEntity={initDVFundEntity} />
  }
}

export default PublicFundDefiVaultDepositCheckGrid
