// ** Type Imports
import type { RequestSheetType } from 'src/types/api/requestSheetTypes'
import type { StatisticType } from 'src/types/api/statisticTypes'

export const getStatisticProcessStatusValue = (
  statisticEntity: StatisticType,
  processStatus: RequestSheetType['processStatus']
) => {
  switch (processStatus) {
    case 'Abandoned':
      return statisticEntity?.requestSheetsProcessStatusAbandoned
    case 'Filling out the sheet':
      return statisticEntity?.requestSheetsProcessStatusFillingOutTheSheet
    case 'Initial review':
      return statisticEntity?.requestSheetsProcessStatusInitialReview
    case 'Initial review modification':
      return statisticEntity?.requestSheetsProcessStatusInitialReviewModification
    case 'Secondary review':
      return statisticEntity?.requestSheetsProcessStatusSecondaryReview
    case 'Secondary review modification':
      return statisticEntity?.requestSheetsProcessStatusSecondaryReviewModification
    case 'Completed':
      return statisticEntity?.requestSheetsProcessStatusCompleted
  }
}
