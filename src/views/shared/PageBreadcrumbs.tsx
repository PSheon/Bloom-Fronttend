// ** MUI Imports
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

// ** Third-Party Imports
import { useTranslation } from 'react-i18next'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface Level {
  href?: string
  title: string
}
interface Props {
  pageLevels: Level[]
}

const PageBreadcrumbs = (props: Props) => {
  // ** Props
  const { pageLevels } = props

  // ** Hooks
  const { t } = useTranslation()

  return (
    <Breadcrumbs separator={<Icon icon='mdi:chevron-right' fontSize={24} />} aria-label='breadcrumb'>
      <Link underline='hover' color='inherit' href='/' sx={{ display: 'flex', alignItems: 'center' }}>
        <Icon icon='mdi:home' />
      </Link>
      {pageLevels.map((level, index) => {
        if (level.href === undefined) {
          return (
            <Typography
              key={`page-breadcrumbs-level-${index}`}
              color={index === pageLevels.length - 1 ? 'text.primary' : 'text.secondary'}
              sx={{ fontWeight: 600 }}
            >
              {t(level.title)}
            </Typography>
          )
        } else {
          return (
            <Link key={`page-breadcrumbs-level-${index}`} underline='hover' color='inherit' href={level.href}>
              <Typography
                color={index === pageLevels.length - 1 ? 'text.primary' : 'text.secondary'}
                sx={{ fontWeight: 600 }}
              >
                {t(level.title)}
              </Typography>
            </Link>
          )
        }
      })}
    </Breadcrumbs>
  )
}

export default PageBreadcrumbs
