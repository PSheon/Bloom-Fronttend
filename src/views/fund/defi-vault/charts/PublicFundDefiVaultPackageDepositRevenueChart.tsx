// ** MUI Imports
import { useTheme } from '@mui/material/styles'

// ** Core Component Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Imports
import { getDepositRevenueSeriesData, getFormattedPriceUnit } from 'src/utils'

// ** Type Imports
import type { ApexOptions } from 'apexcharts'

interface Props {
  startDate: Date
  amount: number
  interestRate: number
  duration: number
  principalDelayInDays: number
}

/* TODO: Fix here later */
const PublicFundDefiVaultPackageDepositRevenueChart = (props: Props) => {
  // ** Props
  const { startDate, amount, interestRate, duration, principalDelayInDays } = props

  // ** Hooks
  const theme = useTheme()

  // ** Vars
  const { principalArray, interestArray, totalArray, categoriesArray } = getDepositRevenueSeriesData(
    startDate,
    amount,
    interestRate,
    duration,
    principalDelayInDays
  )

  const areaColors = {
    total: '#26C6F9',
    principal: '#666CFF',
    interest: '#FDB528'
  }

  const series = [
    {
      name: 'Total',
      data: totalArray
    },
    {
      name: 'Principal',
      data: principalArray
    },
    {
      name: 'Interest',
      data: interestArray
    }
  ]

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    tooltip: {
      shared: true,
      y: {
        formatter: value => `${getFormattedPriceUnit(value)} USDT`
      }
    },
    dataLabels: { enabled: false },
    stroke: {
      show: false,
      curve: 'straight'
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: theme.palette.text.secondary },
      markers: {
        offsetY: 1,
        offsetX: -3
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    colors: [areaColors.total, areaColors.principal, areaColors.interest],
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      show: true,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    yaxis: {
      labels: {
        formatter: value => getFormattedPriceUnit(value),
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      },
      categories: categoriesArray
    }
  }

  return <ReactApexcharts type='area' height={400} options={options} series={series} />
}

export default PublicFundDefiVaultPackageDepositRevenueChart
