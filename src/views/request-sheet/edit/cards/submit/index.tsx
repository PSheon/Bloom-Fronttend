// ** Styled Component
import AbandonedSubmitCard from 'src/views/request-sheet/edit/cards/submit/AbandonedSubmitCard'
import FillingOutTheSheetSubmitCard from 'src/views/request-sheet/edit/cards/submit/FillingOutTheSheetSubmitCard'
import InitialReviewSubmitCard from 'src/views/request-sheet/edit/cards/submit/InitialReviewSubmitCard'
import InitialReviewModificationCard from 'src/views/request-sheet/edit/cards/submit/InitialReviewModificationCard'
import SecondaryReviewSubmitCard from 'src/views/request-sheet/edit/cards/submit/SecondaryReviewSubmitCard'
import SecondaryReviewModificationSubmitCard from 'src/views/request-sheet/edit/cards/submit/SecondaryReviewModificationSubmitCard'
import CompletedSubmitCard from 'src/views/request-sheet/edit/cards/submit/CompletedSubmitCard'

// ** Types
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const SubmitCard = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  if (initRequestSheetEntity.processStatus === 'Abandoned') {
    return <AbandonedSubmitCard initRequestSheetEntity={initRequestSheetEntity} />
  }
  if (initRequestSheetEntity.processStatus === 'Filling out the sheet') {
    return <FillingOutTheSheetSubmitCard initRequestSheetEntity={initRequestSheetEntity} />
  }
  if (initRequestSheetEntity.processStatus === 'Initial review') {
    return <InitialReviewSubmitCard initRequestSheetEntity={initRequestSheetEntity} />
  }
  if (initRequestSheetEntity.processStatus === 'Initial review modification') {
    return <InitialReviewModificationCard initRequestSheetEntity={initRequestSheetEntity} />
  }
  if (initRequestSheetEntity.processStatus === 'Secondary review') {
    return <SecondaryReviewSubmitCard initRequestSheetEntity={initRequestSheetEntity} />
  }
  if (initRequestSheetEntity.processStatus === 'Secondary review modification') {
    return <SecondaryReviewModificationSubmitCard initRequestSheetEntity={initRequestSheetEntity} />
  }

  return <CompletedSubmitCard initRequestSheetEntity={initRequestSheetEntity} />
}

export default SubmitCard
