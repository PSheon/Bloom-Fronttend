// ** MUI Imports
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Imports
import TextEditorPreview from 'src/views/shared/TextEditorPreview'

// ** Type Imports
import type { CardProps } from '@mui/material/Card'
import type { FundType } from 'src/types/api/fundTypes'

interface Props {
  initFundEntity: FundType
}

// ** Styled Root Card component
const StyledRootCard = styled(Card)<CardProps>(({ theme }) => ({
  minHeight: theme.spacing(64)
}))

const ReviewFundPreviewDetailCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <StyledRootCard>
      <CardHeader title='細節' />
      <CardContent>
        <TextEditorPreview blocks={initFundEntity.detail} />
      </CardContent>
    </StyledRootCard>
  )
}

export default ReviewFundPreviewDetailCard
