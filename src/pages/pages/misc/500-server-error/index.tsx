// ** React Imports
import { ReactNode } from 'react'

// ** Layout Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Custom Component Imports
import Error500 from 'src/pages/500'

const Error = () => <Error500 />

Error.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error
