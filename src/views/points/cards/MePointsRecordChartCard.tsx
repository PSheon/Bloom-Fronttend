// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'
import Skeleton from '@mui/material/Skeleton'

// ** Third-Party Imports
import { format, subDays } from 'date-fns'

// ** Custom Component Imports
// import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/pointRecord'

// ** Util Imports
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Type Imports
import type { ApexOptions } from 'apexcharts'
import type { ThemeColor } from 'src/@core/layouts/types'

interface DataType {
  displayName: string
  color: ThemeColor
  data: number[]
  total: number
}

// TODO: Fill action later
const MePointsRecordChartCard = () => {
  // ** Hooks
  const theme = useTheme()

  // ** Hooks
  const { data: pointRecordsData, isLoading: isPointRecordsLoading } = useFindMeQuery({
    filters: {
      createdAt: {
        $gte: format(subDays(new Date(), 9), 'yyyy-MM-dd')
      }
    },
    pagination: {
      page: 1,
      pageSize: 25
    }
  })

  // ** Vars
  const pointRecords = pointRecordsData?.data || []

  const daysRecord = pointRecords.reduce(
    (acc, curr) => {
      const recordDate = new Date(curr.createdAt)
      const diffTime = Math.abs(new Date().getTime() - recordDate.getTime())
      const diffDays = Math.ceil(diffTime / (1_000 * 60 * 60 * 24))

      if (diffDays <= 1) {
        acc['exp'][8] += curr.earningExp
        acc['points'][8] += curr.earningPoints
      } else if (diffDays <= 2) {
        acc['exp'][7] += curr.earningExp
        acc['points'][7] += curr.earningPoints
      } else if (diffDays <= 3) {
        acc['exp'][6] += curr.earningExp
        acc['points'][6] += curr.earningPoints
      } else if (diffDays <= 4) {
        acc['exp'][5] += curr.earningExp
        acc['points'][5] += curr.earningPoints
      } else if (diffDays <= 5) {
        acc['exp'][4] += curr.earningExp
        acc['points'][4] += curr.earningPoints
      } else if (diffDays <= 6) {
        acc['exp'][3] += curr.earningExp
        acc['points'][3] += curr.earningPoints
      } else if (diffDays <= 7) {
        acc['exp'][2] += curr.earningExp
        acc['points'][2] += curr.earningPoints
      } else if (diffDays <= 8) {
        acc['exp'][1] += curr.earningExp
        acc['points'][1] += curr.earningPoints
      } else {
        acc['exp'][0] += curr.earningExp
        acc['points'][0] += curr.earningPoints
      }

      return acc
    },
    { exp: [0, 0, 0, 0, 0, 0, 0, 0, 0], points: [0, 0, 0, 0, 0, 0, 0, 0, 0] }
  )

  const daysRecordSeries = [
    {
      name: 'Experience',
      data: daysRecord.exp
    },
    {
      name: 'Points',
      data: daysRecord.points
    }
  ]

  const daysRecordData: DataType[] = [
    {
      displayName: 'Experience',
      color: 'primary',
      data: daysRecord.exp,
      total: daysRecord.exp.reduce((acc, curr) => acc + curr, 0)
    },
    {
      displayName: 'Points',
      color: 'secondary',
      data: daysRecord.points,
      total: daysRecord.points.reduce((acc, curr) => acc + curr, 0)
    }
  ]

  const options: ApexOptions = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '41%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: [
        format(subDays(new Date(), 8), 'MM/dd'),
        format(subDays(new Date(), 7), 'MM/dd'),
        format(subDays(new Date(), 6), 'MM/dd'),
        format(subDays(new Date(), 5), 'MM/dd'),
        format(subDays(new Date(), 4), 'MM/dd'),
        format(subDays(new Date(), 3), 'MM/dd'),
        format(subDays(new Date(), 2), 'MM/dd'),
        format(subDays(new Date(), 1), 'MM/dd'),
        format(subDays(new Date(), 0), 'MM/dd')
      ]
    },
    yaxis: { show: false },
    colors: [hexToRGBA(theme.palette.success.main, 1), hexToRGBA(theme.palette.primary.main, 1)],
    grid: {
      strokeDashArray: 10,
      borderColor: theme.palette.divider,
      padding: {
        top: 0,
        left: -4,
        right: -5,
        bottom: -14
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 6,
      curve: 'smooth',
      lineCap: 'round',
      colors: [theme.palette.background.paper]
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%'
            }
          }
        }
      },
      {
        breakpoint: 430,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%'
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Points Record'

        // action={
        //   <OptionsMenu
        //     options={['Refresh', 'Edit', 'Share']}
        //     iconButtonProps={{ size: 'small', className: 'card-more-options' }}
        //   />
        // }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        {isPointRecordsLoading ? (
          <Skeleton variant='rounded' height={220} />
        ) : (
          <ReactApexcharts type='bar' height={220} series={daysRecordSeries} options={options} />
        )}
      </CardContent>
      <TableContainer sx={{ mb: 3.75 }}>
        <Table>
          <TableBody>
            {daysRecordData.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '& .MuiTableCell-root': { borderBottomWidth: 0, py: `${theme.spacing(1.125)} !important` } }}
              >
                <TableCell>
                  <Stack
                    direction='row'
                    alignItems='center'
                    sx={{
                      '& svg': { mr: 2.25, color: `${theme.palette[item.color].main}` }
                    }}
                  >
                    <Icon icon='mdi:circle' fontSize='0.75rem' />
                    <Typography variant='body2' color='text.primary' noWrap sx={{ fontWeight: 600 }}>
                      {item.displayName}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction='row' spacing={2} alignItems='center' justifyContent='flex-end'>
                    {isPointRecordsLoading ? (
                      <Skeleton variant='text' width={64} height={24} />
                    ) : (
                      <Typography variant='body2' color='color.primary'>
                        <Typography component='span' sx={{ fontWeight: 600 }}>
                          {`${item.total} `}
                        </Typography>
                        in 9 days
                      </Typography>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default MePointsRecordChartCard
