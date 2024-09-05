// ** Next Imports
import dynamic from 'next/dynamic'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Imports
const TextEditor = dynamic(() => import('src/views/shared/text-editor'), { ssr: false })

// ** Type Imports
import type { DVFundType } from 'src/types/dvFundTypes'

interface Props {
  initDVFundEntity: DVFundType
}

const PublicFundDefiVaultDetailCard = (props: Props) => {
  // ** Props
  const { initDVFundEntity } = props

  return (
    <Card>
      <CardHeader title='Detail' />
      <CardContent>
        <TextEditor blocks={initDVFundEntity.detail} mode='preview' />
      </CardContent>
    </Card>
  )
}

export default PublicFundDefiVaultDetailCard
