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

const ManagementFundPreviewDetailCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <Card>
      <CardHeader title='Detail' />
      <CardContent>
        <TextEditor blocks={initFundEntity.detail} editMode={false} />
      </CardContent>
    </Card>
  )
}

export default ManagementFundPreviewDetailCard
