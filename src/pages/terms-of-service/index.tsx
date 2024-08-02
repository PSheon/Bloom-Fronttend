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

const TermsOfServicePage = () => {
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
            {`Welcome to the ${themeConfig.templateName} platform, the first rebase RWA (Real-World Assets) protocol provided by ${themeConfig.templateName} DAO, a
          decentralized self-governance community of RWA investment (“we”, “our”, or “us”). The platform provides access
          to a decentralized protocol on the blockchain that allows users to participate in RWA investment.`}
          </Typography>
          <Typography variant='body1' component='p'>
            {`This Terms of Service Agreement (the “Agreement”) explains the terms and conditions under which you may access and use the Platform. You must read this Agreement carefully. By accessing or using the Platform, you signify that you have read, understood, and agreed to be bound by this Agreement in its entirety. Otherwise, you are not authorized to access or use the Platform.`}
          </Typography>

          <Stack spacing={4}>
            <Typography variant='body1' component='p' sx={{ fontWeight: 600 }}>
              {`1. Modification of this Agreement`}
            </Typography>
            <Typography variant='body1' component='p'>
              {`We reserve the right, in our sole discretion, to modify this Agreement from time to time. If we make any modifications, we will notify you by updating the date of the modified Agreement. All modifications will be effective when they are posted, and your continued use of the Platform will serve as confirmation of your acceptance of those modifications. If you do not agree with any modifications to this Agreement, you must immediately stop accessing and using the Platform.`}
            </Typography>
          </Stack>

          <Stack spacing={4}>
            <Typography variant='body1' component='p' sx={{ fontWeight: 600 }}>
              {`2. Eligibility`}
            </Typography>
            <Typography variant='body1' component='p'>
              {`To access or use the Platform, you must be able to form a legally binding contract with us. Accordingly, you represent that you are at least eighteen years old and have the full right, power, and authority to enter into and comply with the terms and conditions of this Agreement on behalf of yourself and any company or legal entity for which you may access or use the Platform. You further represent that your action or purpose of using the service shall not, directly or indirectly, violate the laws of any country or region, have relations with any illegal institution, or provide any support to any illegal institution. You further represent that your access and use of the Platform will fully comply with all applicable laws and regulations, and that you will not access or use the Platform to conduct, promote, or otherwise facilitate any illegal activity.`}
            </Typography>
            <Typography variant='body1' component='p'>
              {`Our Service may be set up within the jurisdictions of certain countries or regions and be required to comply with the terms of service in the region where the Service is set up. By accessing or using our Service, you agree that you are solely and entirely responsible for compliance with all laws and regulations that may apply to you. You may not use our Service if you are a citizen, resident, or member of any jurisdiction or group that is subject to economic sanctions by the country or region, or if your use of the Services would be illegal or otherwise violate any applicable law. You further represent that you are not (a) the subject of economic or trade sanctions administered or enforced by any governmental authority or otherwise designated on any list of prohibited or restricted parties or (b) (including but not limited to the following) a citizen, resident, or organization of the Chinese Mainland, Taiwan (province of China), Hong Kong (SAR of China), the United States, or Singapore.`}
            </Typography>
          </Stack>

          <Stack spacing={4}>
            <Typography variant='body1' component='p' sx={{ fontWeight: 600 }}>
              {`3. Proprietary Rights`}
            </Typography>
            <Typography variant='body1' component='p'>
              {`We own all intellectual property and other rights in the Platform and its contents, including (but not limited to) software, text, images, trademarks, service marks, copyrights, patents, and designs. Unless expressly authorized by us, you may not copy, modify, adapt, rent, sell, license, publish, distribute, or otherwise permit any third party to access or use the Platform or any of its contents. Provided that you are eligible, you are hereby granted a single, personal, limited license to access and use the Platform. This license is non-monopolistic, non-exclusive, non-transferable, and freely revocable by us at any time without notice or cause. Use of the Platform or its contents for any purpose not expressly permitted by this Agreement is strictly prohibited.`}
            </Typography>
          </Stack>

          <Stack spacing={4}>
            <Typography variant='body1' component='p' sx={{ fontWeight: 600 }}>
              {`4. Privacy`}
            </Typography>
            <Typography variant='body1' component='p'>
              {`We protect your privacy to the best of our ability while abiding by local laws. We carefully consider each request to ensure that it complies with the letter and spirit of the law and the culture of each region. We do not hesitate to challenge invalid, overboard, or illegal requests, ban their access, and report their illegal acts. We safeguard the integrity and security of your personally identifiable information (“PII”) and aggregate data with reasonable measures. However, we cannot guarantee that third parties will not obtain or use your PII for improper purposes. You acknowledge that you provide your PII and aggregate data at your own risk. By accessing or using our service, you understand and consent to our collection, use, and disclosure of your PII and aggregate data.`}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}

TermsOfServicePage.authGuard = false
TermsOfServicePage.getLayout = (page: ReactNode) => <CommonLayout>{page}</CommonLayout>

export default TermsOfServicePage
