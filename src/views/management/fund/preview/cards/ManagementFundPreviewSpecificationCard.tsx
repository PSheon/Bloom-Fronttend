// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third-Party Imports
import { format } from 'date-fns'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getFormattedEthereumAddress } from 'src/utils'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

// ** Styled components
const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.text.secondary
  }
}))

interface Props {
  initFundEntity: FundType
}
interface SpecDetailStackProps {
  title: string
  hint?: string
  content: string
  linkHref?: string
}

const SpecDetailStack = (props: SpecDetailStackProps) => {
  // ** Props
  const { title, hint = null, content, linkHref = null } = props

  // ** States
  const [isCopied, setIsCopied] = useState(false)

  // ** Vars
  const formattedContent = getFormattedEthereumAddress(content)

  // ** Logics
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)

    setIsCopied(() => true)
    setTimeout(() => {
      setIsCopied(() => false)
    }, 1200)
  }

  return (
    <Stack spacing={2} sx={{ maxWidth: '24ch' }}>
      <Stack direction='row' spacing={1.2} alignItems='center'>
        <Typography variant='body2' component='p' color='text.secondary' sx={{ py: 1 }}>
          {title}
        </Typography>
        {hint && (
          <Tooltip title={hint}>
            <IconButton size='small'>
              <Icon icon='mdi:information-outline' fontSize={16} />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      {linkHref ? (
        <LinkStyled href={linkHref}>{content}</LinkStyled>
      ) : (
        <Stack direction='row' spacing={1.2} alignItems='center'>
          <Typography
            variant='subtitle1'
            component='p'
            sx={{
              fontWeight: 600,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            {formattedContent === '' ? content : formattedContent}
          </Typography>

          {formattedContent !== '' && (
            <IconButton size='small' onClick={() => handleCopy(content)}>
              <Icon icon={isCopied ? 'mdi:check-outline' : 'mdi:content-copy'} fontSize={16} />
            </IconButton>
          )}
        </Stack>
      )}
    </Stack>
  )
}

const ManagementFundPreviewSpecificationCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <Card>
      <CardHeader title='規格' />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={4} md={2}>
            <SpecDetailStack title='Fund Manager' content='Bloom DAO' linkHref='/' />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <SpecDetailStack
              title='Genesis Date'
              hint='(UTC) Date where returns start accruing.'
              content={format(new Date(initFundEntity.genesisDate), 'yyyy/MM/dd')}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <SpecDetailStack
              title='Maturity Date'
              hint="(UTC) Date where the fund's term ends."
              content={format(new Date(initFundEntity.maturityDate), 'yyyy/MM/dd')}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <SpecDetailStack
              title='Sale Start Time'
              hint='(UTC) Date when the fund starts accepting investments.'
              content={format(new Date(initFundEntity.saleStartTime), 'PPp')}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <SpecDetailStack
              title='Performance Fee'
              hint='A performance fee is a profit-sharing agreement made with an investment manager.'
              content={`${initFundEntity.performanceFeePercentage}%`}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <SpecDetailStack title='Protocol Fee' content={`${0}%`} />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <SpecDetailStack title='Fund SFT' content={initFundEntity.sft?.contractAddress ?? 'Generating'} />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <SpecDetailStack title='Vault SFT' content={initFundEntity.vault?.contractAddress ?? 'Generating'} />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <SpecDetailStack title='Est.APY' hint='Estimated APY.' content={`${initFundEntity.estimatedAPY}%`} />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <SpecDetailStack title='Redemption Freq' content={`${initFundEntity.redemptionFrequencyInDays} Days`} />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <SpecDetailStack title='Whitelist' content='No Criteria' />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <SpecDetailStack title='Purchase Limit' content='No limit' />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ManagementFundPreviewSpecificationCard
