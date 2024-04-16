// ** React Imports
import { ReactNode } from 'react'

// ** Layout Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Custom Component Imports
import Error404 from 'src/pages/404'

const Error = () => <Error404 />

Error.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error
