// ** Next Imports
import Image from 'next/image'
import Link from 'next/link'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

// ** Third-Party Imports
import { ExactNumber as N } from 'exactnumber'
import { Atropos } from 'atropos/react'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getFormattedPriceUnit } from 'src/utils'

// ** Type Imports
import type { TokenType } from 'src/types/tokenTypes'

// ** Styled <sup> Component
const Sup = styled('sup')(({ theme }) => ({
  fontSize: '1.2rem',
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

interface Props {
  initTokenEntity: TokenType
}

const PortfolioOwnedSFTCard = (props: Props) => {
  // ** Props
  const { initTokenEntity } = props

  // ** Hooks
  const theme = useTheme()

  // ** Vars
  const sftId = BigInt(initTokenEntity.tokenId)
  const sftValue = BigInt(initTokenEntity.tokenValue)
  const sftSlot = initTokenEntity.package?.data

  return (
    <Card>
      <CardContent sx={{ height: '100%' }}>
        <Stack
          spacing={4}
          alignItems='center'
          justifyContent='flex-start'
          sx={{ position: 'relative', height: '100%' }}
        >
          <Box sx={{ position: 'absolute', top: 0, right: 8 }}>
            <CustomChip
              skin='light'
              size='medium'
              label={`# ${sftId ?? '-'}`}
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
          <Stack spacing={4} flex='1' alignSelf='stretch'>
            <Stack direction='row' spacing={4} justifyContent='space-between'>
              <Typography variant='h5' component='p'>
                {sftSlot?.attributes.displayName}
              </Typography>
              <Stack direction='row' sx={{ position: 'relative' }}>
                <Sup>$</Sup>
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
                  {typeof sftValue === 'bigint' ? getFormattedPriceUnit(N(sftValue).div(N(10).pow(18)).toNumber()) : 0n}
                </Typography>
              </Stack>
            </Stack>

            <Box>
              <Typography variant='body2'>{sftSlot?.attributes.description || 'No description'}</Typography>
            </Box>
            <Box>
              <Divider />
            </Box>
            <Stack spacing={2} flex='1' justifyContent='flex-start'>
              <Typography variant='subtitle2' component='p'>
                Utility
              </Typography>

              <Stack spacing={2} alignSelf='stretch'>
                {sftSlot?.attributes.slots.map(property => {
                  return (
                    <Stack
                      key={`slot-${property.id}`}
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                    >
                      <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                        <Icon
                          icon={property.displayType === 'string' ? 'mdi:format-text-variant-outline' : 'mdi:numbers'}
                          fontSize={16}
                        />
                        <Typography variant='subtitle1' component='p'>
                          {property.propertyName}
                        </Typography>
                      </Stack>
                      <Typography variant='subtitle1' component='p' sx={{ fontWeight: 600 }}>
                        {property.displayValue ?? property.value}
                      </Typography>
                    </Stack>
                  )
                })}
              </Stack>
            </Stack>
            <Stack spacing={2} sx={{ mt: 'auto' }}>
              <Divider />
              <Button
                fullWidth
                variant='contained'
                component={Link}
                href={`/fund/live/${initTokenEntity.belongToFund!.data!.id}/vault`}
              >
                Check
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PortfolioOwnedSFTCard
