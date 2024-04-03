// ** React Imports
import { useState, SyntheticEvent } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types
import { TabIndex, RequestSheetType } from 'src/types/api/requestSheetTypes'

// ** Styled Component
import RequestSheetEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import RequestSheetTitleCard from 'src/views/review/request-sheet/edit/cards/TitleCard'
import RequestSheetEditTabsList from 'src/views/review/request-sheet/edit/tab/list'
import RequestSheetEditDetailsTabPanel from 'src/views/review/request-sheet/edit/tab/panel/details'
import RequestSheetEditInitialReviewTabPanel from 'src/views/review/request-sheet/edit/tab/panel/initial-review'
import RequestSheetEditSecondaryReviewTabPanel from 'src/views/review/request-sheet/edit/tab/panel/secondary-review'
import RequestSheetEditProcessStatusAlert from 'src/views/review/request-sheet/edit/alerts/ProcessStatusAlert'
import RequestSheetEditSubmitCard from 'src/views/review/request-sheet/edit/cards/submit'
import RequestSheetEditInformationCard from 'src/views/review/request-sheet/edit/cards/InformationCard'

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const RequestSheetEditSection = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  // ** States
  const [selectedTab, setSelectedTab] = useState<TabIndex>('details')

  // ** Logics
  const handleChangeTab = (event: SyntheticEvent, newTabIndex: TabIndex) => {
    setSelectedTab(newTabIndex)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <RequestSheetEditBreadcrumbs
          pageLevels={[{ title: '申請審核', href: '/review/request-sheet/list' }, { title: '審核申請' }]}
        />
      </Grid>
      <Grid item xl={9} md={8} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <RequestSheetTitleCard initRequestSheetEntity={initRequestSheetEntity} />
          </Grid>
          <Grid item xs={12}>
            <RequestSheetEditTabsList
              initRequestSheetEntity={initRequestSheetEntity}
              selectedTab={selectedTab}
              handleChangeTab={handleChangeTab}
            />
          </Grid>
          {selectedTab === 'details' && (
            <RequestSheetEditDetailsTabPanel initRequestSheetEntity={initRequestSheetEntity} />
          )}
          {selectedTab === 'initialReview' && (
            <RequestSheetEditInitialReviewTabPanel initRequestSheetEntity={initRequestSheetEntity} />
          )}
          {selectedTab === 'secondaryReview' && (
            <RequestSheetEditSecondaryReviewTabPanel initRequestSheetEntity={initRequestSheetEntity} />
          )}
        </Grid>
      </Grid>
      <Grid item xl={3} md={4} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <RequestSheetEditProcessStatusAlert initRequestSheetEntity={initRequestSheetEntity} />
          </Grid>
          <Grid item xs={12}>
            <RequestSheetEditSubmitCard initRequestSheetEntity={initRequestSheetEntity} />
          </Grid>
          <Grid item xs={12}>
            <RequestSheetEditInformationCard initRequestSheetEntity={initRequestSheetEntity} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RequestSheetEditSection
