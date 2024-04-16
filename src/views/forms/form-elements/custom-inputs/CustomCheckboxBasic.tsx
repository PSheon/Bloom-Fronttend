// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Core Component Imports
import CustomCheckboxBasic from 'src/@core/components/custom-checkbox/basic'

// ** Type Imports
import { CustomCheckboxBasicData } from 'src/@core/components/custom-checkbox/types'

const data: CustomCheckboxBasicData[] = [
  {
    meta: '20%',
    isSelected: true,
    value: 'discount',
    title: 'Discount',
    content: 'Wow! Get 20% off on your next purchase!'
  },
  {
    meta: 'Free',
    value: 'updates',
    title: 'Updates',
    content: 'Get Updates regarding related products.'
  }
]

const BasicCustomCheckbox = () => {
  const initialSelected: string[] = data.filter(item => item.isSelected).map(item => item.value)

  // ** States
  const [selected, setSelected] = useState<string[]>(initialSelected)

  // ** Logics
  const handleChange = (value: string) => {
    if (selected.includes(value)) {
      const updatedArr = selected.filter(item => item !== value)
      setSelected(updatedArr)
    } else {
      setSelected([...selected, value])
    }
  }

  return (
    <Grid container spacing={4}>
      {data.map((item, index) => (
        <CustomCheckboxBasic
          key={index}
          data={data[index]}
          selected={selected}
          handleChange={handleChange}
          name='custom-checkbox-basic'
          gridProps={{ sm: 6, xs: 12 }}
        />
      ))}
    </Grid>
  )
}

export default BasicCustomCheckbox
