// ** React Imports
import { ReactNode } from 'react'

// ** Layout Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Custom Component Imports
import Error500Page from 'src/pages/500'

const Error = () => <Error500Page />

Error.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error
