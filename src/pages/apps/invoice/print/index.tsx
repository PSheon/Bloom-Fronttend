// ** React Imports
import { ReactNode } from 'react'

// ** Layout Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Custom Component Imports
import PrintPage from 'src/views/apps/invoice/print/PrintPage'

const InvoicePrint = () => {
  return <PrintPage id='4987' />
}

InvoicePrint.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

InvoicePrint.setConfig = () => {
  return {
    mode: 'light'
  }
}

export default InvoicePrint
