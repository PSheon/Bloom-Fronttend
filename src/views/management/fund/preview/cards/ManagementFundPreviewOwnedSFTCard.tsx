// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'

// ** Third-Party Imports
import { useAccount, useReadContract } from 'wagmi'
import { Atropos } from 'atropos/react'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getFundCurrencyProperties, getFormattedPriceUnit, getChainId } from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

// ** Styled <sup> Component
const Sup = styled('sup')(({ theme }) => ({
  fontSize: '1.2rem',
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

interface Props {
  initFundEntity: FundType
  sftTokenIndex: number
}

const ManagementFundPreviewOwnedSFTCard = (props: Props) => {
  // ** Props
  const { initFundEntity, sftTokenIndex } = props

  // ** Hooks
  const theme = useTheme()
  const walletAccount = useAccount()

  const { data: sftTokenId, isLoading: isSftTokenIdLoading } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.fundSFTContractAbi,
    address: initFundEntity.fundSFTContractAddress as `0x${string}`,
    functionName: 'tokenOfOwnerByIndex',
    args: [walletAccount.address!, sftTokenIndex],
    account: walletAccount.address!
  })

  const { data: sftValue, isLoading: isSftValueLoading } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.fundSFTContractAbi,
    address: initFundEntity.fundSFTContractAddress as `0x${string}`,
    functionName: 'balanceOf',
    args: [sftTokenId],
    account: walletAccount.address!,
    query: {
      enabled: !isSftTokenIdLoading && sftTokenId !== undefined
    }
  })

  const { data: sftSlotId, isLoading: isSftSlotIdLoading } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.fundSFTContractAbi,
    address: initFundEntity.fundSFTContractAddress as `0x${string}`,
    functionName: 'slotOf',
    args: [sftTokenId],
    account: walletAccount.address!,
    query: {
      enabled: !isSftTokenIdLoading && sftTokenId !== undefined
    }
  })

  // ** Vars
  const formattedSftValue = BigInt(Number(sftValue ?? 0)) / 10n ** 18n
  const sftSlot = initFundEntity.defaultPackages?.data.find(pkg => pkg.id === Number(sftSlotId))
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initFundEntity.baseCurrency)

  // ** Side Effects
  if (isSftTokenIdLoading || isSftValueLoading || isSftSlotIdLoading) {
    return (
      <Card>
        <CardContent>
          <Stack spacing={4} alignItems='center' justifyContent='center' sx={{ position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 0, right: 8 }}>
              <Skeleton variant='rounded' width={48} height={24} />
            </Box>
            <Box
              sx={{
                minHeight: theme => theme.spacing(64),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Skeleton variant='rounded' width={180} height={200} />
            </Box>
          </Stack>
          <Stack spacing={4} alignSelf='stretch'>
            <Stack direction='row' spacing={2} flexWrap='wrap' justifyContent='space-between'>
              <Skeleton width={150} />
              <Skeleton variant='text' width={45} />
            </Stack>
          </Stack>

          <Box sx={{ mt: 4 }}>
            <Typography variant='body2'>
              <Skeleton />
            </Typography>
            <Typography variant='body2'>
              <Skeleton />
            </Typography>
          </Box>
          <Box>
            <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
          </Box>
          <Stack spacing={2} justifyContent='center'>
            <Typography variant='subtitle2' component='p'>
              Utility
            </Typography>

            <Stack spacing={2} alignSelf='stretch'>
              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Skeleton variant='text' width={160} />
                <Skeleton variant='text' width={100} />
              </Stack>
              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Skeleton variant='text' width={160} />
                <Skeleton variant='text' width={100} />
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{ mt: 'auto' }}>
            <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
            <Button
              fullWidth
              disabled
              variant='contained'
              size='small'
              sx={{
                '& svg': {
                  transition: theme => theme.transitions.create('transform')
                }
              }}
              startIcon={<Icon icon='mdi:keyboard-arrow-down' />}
            >
              <Typography variant='subtitle2' component='p'>
                Stake
              </Typography>
            </Button>
          </Stack>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={4} alignItems='center' justifyContent='center' sx={{ position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: 0, right: 8 }}>
            <CustomChip
              skin='light'
              size='medium'
              label={`# ${sftTokenId ?? '-'}`}
              color='success'
              sx={{
                height: 20,
                fontWeight: 600,
                borderRadius: '5px',
                fontSize: '0.875rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { mt: -0.25 }
              }}
            />
          </Box>
          <Box
            sx={{
              minHeight: theme => theme.spacing(64),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& img:hover': {
                cursor: 'pointer'
              }
            }}
          >
            <Atropos>
              <Image
                width={180}
                height={256}
                draggable={false}
                alt={sftSlot?.attributes.displayName ?? 'SFT Slot'}
                src={`/images/funds/packages/card-skin/${sftSlot?.attributes.skin.toLowerCase()}-${
                  theme.palette.mode
                }.webp`}
              />
            </Atropos>
          </Box>
          <Stack spacing={4} alignSelf='stretch'>
            <Stack direction='row' spacing={2} flexWrap='wrap' justifyContent='space-between'>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Typography variant='h5' component='p'>
                  {sftSlot?.attributes.displayName}
                </Typography>
              </Stack>
              <Stack direction='row' sx={{ position: 'relative' }}>
                <Sup>{fundBaseCurrencyProperties.symbol}</Sup>
                <Typography
                  variant='h4'
                  component='p'
                  sx={{
                    mb: -1.2,
                    ml: 2,
                    lineHeight: 1,
                    color: 'primary.main'
                  }}
                >
                  {getFormattedPriceUnit(formattedSftValue ?? 0)}
                </Typography>
              </Stack>
            </Stack>

            <Box>
              <Typography variant='body2'>{sftSlot?.attributes.description || 'No description'}</Typography>
            </Box>
            <Box>
              <Divider />
            </Box>
            <Stack spacing={2} justifyContent='center'>
              <Typography variant='subtitle2' component='p'>
                Utility
              </Typography>

              <Stack spacing={2} alignSelf='stretch'>
                {sftSlot?.attributes.slot.map(property => {
                  return (
                    <Stack
                      key={`slot-${property.id}`}
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                    >
                      <Typography variant='subtitle1' component='p'>
                        {property.propertyType}
                      </Typography>
                      <Typography variant='subtitle1' component='p' sx={{ fontWeight: 600 }}>
                        {property.value}
                      </Typography>
                    </Stack>
                  )
                })}
              </Stack>
            </Stack>
            <Stack sx={{ mt: 'auto' }}>
              <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
              <Button
                fullWidth
                variant='contained'
                size='small'
                sx={{
                  '& svg': {
                    transition: theme => theme.transitions.create('transform')
                  }
                }}
                startIcon={<Icon icon='mdi:keyboard-arrow-down' />}
              >
                <Typography variant='subtitle2' component='p'>
                  Stake
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ManagementFundPreviewOwnedSFTCard
