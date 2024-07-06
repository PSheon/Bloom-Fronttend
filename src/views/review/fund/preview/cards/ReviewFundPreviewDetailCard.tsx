// ** Next Imports
import dynamic from 'next/dynamic'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Imports
const TextEditor = dynamic(() => import('src/views/shared/text-editor'), { ssr: false })

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ReviewFundPreviewDetailCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <Card>
      <CardHeader title='細節' />
      <CardContent>
        <TextEditor blocks={initFundEntity.detail} mode='read' />
      </CardContent>
    </Card>
  )
}

export default ReviewFundPreviewDetailCard
