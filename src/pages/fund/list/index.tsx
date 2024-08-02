// ** React Imports
import { useState, useCallback } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import PublicFundListBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import PublicFundListHeaderGrid from 'src/views/fund/list/grids/PublicFundListHeaderGrid'
import PublicFundListPinnedGrid from 'src/views/fund/list/grids/PublicFundListPinnedGrid'
import PublicFundListDataGrid from 'src/views/fund/list/grids/PublicFundListDataGrid'

// ** Hook Imports
import useDebounce from 'src/hooks/useDebounce'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/fund'

// ** Type Imports
import type { ChangeEvent } from 'react'

const PublicFundListPage = () => {
  // ** States
  const [filteredFundDisplayname, setFilteredFundDisplayname] = useState<string>('')

  // const [filteredStatus, setFilteredStatus] = useState<string>('all')
  // const [filteredIsHighlighted, setFilteredIsHighlighted] = useState<string>('all')
  // const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const debouncedFilteredFundDisplayname = useDebounce(filteredFundDisplayname, 300)

  // ** Hooks
  const { data: fundsData, isLoading: isFundListLoading } = useFindQuery({
    filters: {
      ...(debouncedFilteredFundDisplayname !== '' && {
        $or: [{ displayName: { $containsi: debouncedFilteredFundDisplayname } }]
      }),
      status: 'Published'

      // ...(filteredStatus !== 'all' && { status: filteredStatus }),
      // ...(filteredIsHighlighted !== 'all' && { isHighlighted: filteredIsHighlighted === 'isHighlighted' })
    },
    pagination: {
      page: 1,
      pageSize: 25
    }
  })

  // const [updateFund] = useUpdateOneMutation()

  // ** Vars
  const funds = fundsData?.data || []
  const totalRows = fundsData?.meta.pagination.total || 0

  // ** Logics
  const handleFilterFundDisplayname = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilteredFundDisplayname(e.target.value)
  }, [])

  // const handleFilterStatusChange = useCallback((e: SelectChangeEvent) => {
  //   setFilteredStatus(e.target.value)
  // }, [])
  // const handleIsHighlightedChange = useCallback((e: SelectChangeEvent) => {
  //   setFilteredIsHighlighted(e.target.value)
  // }, [])

  // const handleHighlightFund = async (id: number, isHighlighted: boolean) => {
  //   await updateFund({ id, data: { isHighlighted } })
  // }

  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
            <PublicFundListBreadcrumbs pageLevels={[{ title: 'PageBreadcrumb.Public.Funds & Strategies.PageTitle' }]} />
          </Grid>

          <Grid item xs={12}>
            <PublicFundListHeaderGrid
              filteredFundDisplayname={filteredFundDisplayname}
              handleFilterFundDisplayname={handleFilterFundDisplayname}

              // filteredStatus={filteredStatus}
              // handleFilterStatusChange={handleFilterStatusChange}
              // filteredIsHighlighted={filteredIsHighlighted}
              // handleIsHighlightedChange={handleIsHighlightedChange}
            />
          </Grid>
          <Grid item xs={12}>
            <PublicFundListPinnedGrid />
          </Grid>
          <Grid item xs={12}>
            <PublicFundListDataGrid funds={funds} totalRows={totalRows} isFundListLoading={isFundListLoading} />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

PublicFundListPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default PublicFundListPage
