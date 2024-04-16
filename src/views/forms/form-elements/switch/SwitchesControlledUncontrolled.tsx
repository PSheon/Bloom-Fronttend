// ** React Imports
import { ChangeEvent, useState } from 'react'

// ** MUI Imports
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

const SwitchesControlledUncontrolled = () => {
  // ** States
  const [checked, setChecked] = useState<boolean>(false)

  // ** Logics
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  return (
    <FormGroup row>
      <FormControlLabel label='Controlled' control={<Switch checked={checked} onChange={handleChange} />} />
      <FormControlLabel control={<Switch />} label='Uncontrolled' />
    </FormGroup>
  )
}

export default SwitchesControlledUncontrolled
