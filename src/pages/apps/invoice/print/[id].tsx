// ** React Imports
import { ReactNode } from 'react'

// ** Next Imports
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third-Party Imports
import axios from 'axios'

// ** Layout Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Custom Component Imports
import PrintPage from 'src/views/apps/invoice/print/PrintPage'

// ** Type Imports
import { InvoiceType } from 'src/types/apps/invoiceTypes'

const InvoicePrint = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <PrintPage id={id} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get('/apps/invoice/invoices')
  const data: InvoiceType[] = await res.data.allData

  const paths = data.map((item: InvoiceType) => ({
    params: { id: `${item.id}` }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      id: params?.id
    }
  }
}

InvoicePrint.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

InvoicePrint.setConfig = () => {
  return {
    mode: 'light'
  }
}

export default InvoicePrint
