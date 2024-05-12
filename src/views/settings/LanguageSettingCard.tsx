// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

// ** Third-Party Imports
import { useTranslation } from 'react-i18next'

// ** Custom Component Imports
import LanguageSelectBox from 'src/views/settings/select-box/LanguageSelectBox'

const LanguageSettingCard = () => {
  // ** Hooks
  const { i18n } = useTranslation()

  return (
    <Card>
      <CardHeader title='系統' />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>語言</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item>
                <LanguageSelectBox
                  selected={i18n.language}
                  value='zh_TW'
                  icon='uil:english-to-chinese'
                  title='繁體中文'
                  color='primary'
                  handleClick={() => i18n.changeLanguage('zh_TW')}
                />
              </Grid>
              <Grid item>
                <LanguageSelectBox
                  selected={i18n.language}
                  value='en'
                  icon='uil:english-to-chinese'
                  title='English'
                  color='primary'
                  handleClick={() => i18n.changeLanguage('en')}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default LanguageSettingCard
