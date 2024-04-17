// ** React Imports
import { ReactNode } from 'react'

// ** Layout Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'

const LandingPage = () => {
  return <>Landing Page</>
}

LandingPage.authGuard = false
LandingPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LandingPage
