// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import format from 'date-fns/format'

// ** Layout Imports
import CommonLayout from 'src/layouts/CommonLayout'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Type Imports
import type { ReactNode } from 'react'

const PrivacyPolicyPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Stack spacing={6}>
          <Stack>
            <Typography variant='h6' component='h1' sx={{ fontWeight: 900 }}>
              {`${themeConfig.templateName} Privacy Policy`}
            </Typography>
            <Typography variant='subtitle1' component='p'>
              {`Date of last revision ${format(new Date('2023-08-23'), 'PP')}`}
            </Typography>
          </Stack>

          <Typography variant='body1' component='p'>
            {`${themeConfig.templateName} RWA Platform (hereinafter referred to as "we" or "our platform") is committed to protecting your privacy and personal data security. This Privacy Policy explains how we collect, use, store, and protect your personal information.`}
          </Typography>
          <Typography variant='body1' component='p'>
            {`In this Privacy Policy, the Company’s software is referred to as the “Site,” “Sites,” or as the “Software.”`}
          </Typography>

          <Typography variant='body1' component='p'>
            {`What information do we collect and how do we use it?`}
          </Typography>

          <Stack spacing={4}>
            <Typography variant='body1' component='p'>
              {`Gathering and Use of Information About Your Browser and Device`}
            </Typography>
            <Typography variant='body1' component='p'>
              {`When you come to one of our Sites or use our Services or Software, we may collect some limited information that your device and browser routinely make available whenever you visit a website or interact with any online service. This information includes your Internet Protocol (IP) address, port number, Software version, browser type, browser language, the date and time of your query and one or more cookies that may uniquely identify your browser. It may also include your approximate location, your device and operating system type and data from sensors in your device like the accelerometer.`}
            </Typography>
            <Typography variant='body1' component='p'>
              {`We collect this data to improve the overall quality of the online experience, including product monitoring, product improvement, and targeted advertising. STUSDT also uses such information for the following general purposes: to customize the advertising and content you see, fulfill your requests for products and services, improve our services, conduct research, and provide anonymous reporting for internal and external clients.`}
            </Typography>
            <Typography variant='body1' component='p'>
              {`In addition to collecting the above types of information, STUSDT collects queries for internal reporting and targeted advertising. We also count, track, and aggregate the visitor’s activity into our analysis of general traffic flows at our Sites (e.g., tracking where traffic comes from, how traffic flows within the websites, etc.). To these ends, we may merge information about you into group data, which may then be shared on an aggregated basis with our advertisers.`}
            </Typography>
            <Typography variant='body1' component='p'>
              {`In the event that you provide us with answers to voluntary survey questions, we may present this information to our advertisers and partners, in the form of grouped statistics compiled from our users’ answers to such questions.`}
            </Typography>
            <Typography variant='body1' component='p'>
              {`We also collect data from the Software regarding traffic flows and content delivery performance as well as other data collected in the use of our products or services in order to understand usability and monitor network conditions and compare the performance of the Software and HTTP protocols on the public internet.`}
            </Typography>
          </Stack>

          <Stack spacing={4}>
            <Typography variant='body1' component='p'>
              {` Gathering and Use of Personal Information`}
            </Typography>
            <Typography variant='body1' component='p'>
              {`You may visit the Sites and use the Software and many of the Services without any registration at all. However, from time to time, we may enable certain additional functionality or services whereby you will have to create a user account, and we may collect and process the following information about you:`}
            </Typography>
            <Typography variant='body1' component='p'>
              {` information such as your name, address, phone number and e-mail address, and other demographic information (such as date of birth, gender, age, and interests) that you provide by completing forms on the Sites, including if you register as a user of the Services, subscribe to our mailing lists, upload or submit any material through the services, or request any information.`}
            </Typography>
            <Typography variant='body1' component='p'>
              {`your log-in and password details in connection with the account sign-in process.`}
            </Typography>
            <Typography variant='body1' component='p'>
              {`if you log-in using a third-party social media account (such as a Facebook or Google account), we may collect basic account information about you from that social media provider (such as your name, address, phone number and e-mail address, and other demographic information, like your date of birth, gender, age and interests).`}
            </Typography>
            <Typography variant='body1' component='p'>
              {`details of any requests or transactions made by you through the Service.`}
            </Typography>
            <Typography variant='body1' component='p'>
              {`communications you send to us, for example to report a problem or to submit queries, concerns, or comments regarding the Service or its content.`}
            </Typography>
            <Typography variant='body1' component='p'>
              {` information that you post to the Site in the form of comments or contributions to discussions.`}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}

PrivacyPolicyPage.authGuard = false
PrivacyPolicyPage.getLayout = (page: ReactNode) => <CommonLayout>{page}</CommonLayout>

export default PrivacyPolicyPage
