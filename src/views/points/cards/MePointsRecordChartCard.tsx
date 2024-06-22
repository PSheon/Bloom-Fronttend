// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'
import Backdrop from '@mui/material/Backdrop'

// ** Custom Component Imports
import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Type Imports
import type { ReactNode } from 'react'
import type { ApexOptions } from 'apexcharts'
import type { ThemeColor } from 'src/@core/layouts/types'

interface DataType {
  title: string
  amount: string
  icon: ReactNode
  color: ThemeColor
  trendAmount: number
}

const MePointsRecordChartCard = () => {
  // ** Hooks
  const theme = useTheme()

  // ** Vars
  const data: DataType[] = [
    {
      amount: '$845k',
      trendAmount: 82,
      color: 'primary',
      title: 'Stake Points',
      icon: (
        <Box sx={{ color: 'success.main' }}>
          <Icon icon='mdi:chevron-up' />
        </Box>
      )
    },
    {
      trendAmount: 52,
      amount: '$12.5k',
      color: 'secondary',
      title: 'Team Shares',
      icon: (
        <Box sx={{ color: 'error.main' }}>
          <Icon icon='mdi:chevron-down' />
        </Box>
      )
    }
  ]

  const series = [
    {
      name: 'Stake Points',
      data: [155, 135, 320, 100, 150, 335, 160]
    },
    {
      name: 'Team Shares',
      data: [110, 235, 125, 230, 215, 115, 200]
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
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yaxis: { show: false },
    colors: [hexToRGBA(theme.palette.primary.main, 1), hexToRGBA(theme.palette.secondary.main, 1)],
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

  /* TODO: fix here later */
  return (
    <Card sx={{ position: 'relative' }}>
      <Backdrop
        sx={{ position: 'absolute', color: 'common.white', zIndex: theme => theme.zIndex.mobileStepper - 1 }}
        open
      >
        <Typography>Coming soon</Typography>
      </Backdrop>
      <CardHeader
        title='Points Record'
        action={
          <OptionsMenu
            options={['Refresh', 'Edit', 'Share']}
            iconButtonProps={{ size: 'small', className: 'card-more-options' }}
          />
        }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='bar' height={220} series={series} options={options} />
      </CardContent>
      <TableContainer sx={{ mb: 3.75 }}>
        <Table>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '& .MuiTableCell-root': { borderBottomWidth: 0, py: `${theme.spacing(1.125)} !important` } }}
              >
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      '& svg': { mr: 2.25, color: `${theme.palette[item.color].main}` }
                    }}
                  >
                    <Icon icon='mdi:circle' fontSize='0.75rem' />
                    <Typography variant='body2' sx={{ fontWeight: 600, whiteSpace: 'nowrap', color: 'text.primary' }}>
                      {item.title}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant='body2'>{item.amount}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Typography
                      variant='body2'
                      sx={{ mr: 2.5, fontWeight: 600, color: 'text.primary' }}
                    >{`${item.trendAmount}%`}</Typography>
                    {item.icon}
                  </Box>
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
