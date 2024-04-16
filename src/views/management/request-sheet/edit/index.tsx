// ** React Imports
import { useState, SyntheticEvent } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import RequestSheetEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import RequestSheetEditTabsList from 'src/views/management/request-sheet/edit/tab/list'
import RequestSheetEditDetailsTabPanel from 'src/views/management/request-sheet/edit/tab/panel/details'
import RequestSheetEditInitialReviewTabPanel from 'src/views/management/request-sheet/edit/tab/panel/initial-review'
import RequestSheetEditSecondaryReviewTabPanel from 'src/views/management/request-sheet/edit/tab/panel/secondary-review'
import RequestSheetTitleCard from 'src/views/management/request-sheet/edit/cards/TitleCard'
import RequestSheetEditProcessStatusAlert from 'src/views/management/request-sheet/edit/alerts/ProcessStatusAlert'
import RequestSheetEditControlCard from 'src/views/management/request-sheet/edit/cards/ControlCard'
import RequestSheetEditInformationCard from 'src/views/management/request-sheet/edit/cards/InformationCard'
import RequestSheetEditActivityTimelineCard from 'src/views/management/request-sheet/edit/cards/activity-timeline'
import RequestSheetEditDeleteButton from 'src/views/management/request-sheet/edit/buttons/DeleteButton'

// ** Type Imports
import { TabIndex, RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const RequestSheetEditSection = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  // ** States
  const [selectedTab, setSelectedTab] = useState<TabIndex>('details')
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  // ** Logics
  const handleChangeTab = (event: SyntheticEvent, newTabIndex: TabIndex) => {
    setSelectedTab(newTabIndex)
  }
  const handleToggleEditMode = () => {
    setIsEditMode(prev => !prev)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <RequestSheetEditBreadcrumbs
          pageLevels={[{ title: '申請管理', href: '/management/request-sheet/list' }, { title: '編輯申請' }]}
        />
      </Grid>
      <Grid item xl={9} md={8} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <RequestSheetTitleCard initRequestSheetEntity={initRequestSheetEntity} />
          </Grid>
          <Grid item xs={12}>
            <RequestSheetEditTabsList selectedTab={selectedTab} handleChangeTab={handleChangeTab} />
          </Grid>
          {selectedTab === 'details' && (
            <RequestSheetEditDetailsTabPanel initRequestSheetEntity={initRequestSheetEntity} isEditMode={isEditMode} />
          )}
          {selectedTab === 'initialReview' && (
            <RequestSheetEditInitialReviewTabPanel
              initRequestSheetEntity={initRequestSheetEntity}
              isEditMode={isEditMode}
            />
          )}
          {selectedTab === 'secondaryReview' && (
            <RequestSheetEditSecondaryReviewTabPanel
              initRequestSheetEntity={initRequestSheetEntity}
              isEditMode={isEditMode}
            />
          )}
        </Grid>
      </Grid>
      <Grid item xl={3} md={4} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <RequestSheetEditProcessStatusAlert initRequestSheetEntity={initRequestSheetEntity} />
          </Grid>
          <Grid item xs={12}>
            <RequestSheetEditControlCard
              initRequestSheetEntity={initRequestSheetEntity}
              isEditMode={isEditMode}
              handleToggleEditMode={handleToggleEditMode}
            />
          </Grid>
          <Grid item xs={12}>
            <RequestSheetEditInformationCard initRequestSheetEntity={initRequestSheetEntity} />
          </Grid>
          <Grid item xs={12}>
            <RequestSheetEditActivityTimelineCard initRequestSheetEntity={initRequestSheetEntity} />
          </Grid>
          <Grid item xs={12}>
            <RequestSheetEditDeleteButton initRequestSheetEntity={initRequestSheetEntity} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RequestSheetEditSection
