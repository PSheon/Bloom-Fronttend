// ** Core Component Imports
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Custom Component Imports
import Edit from 'src/views/apps/invoice/edit/Edit'

const InvoiceEdit = () => {
  return (
    <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
      <Edit id='4987' />
    </DatePickerWrapper>
  )
}

export default InvoiceEdit
