import React from 'react'
import { Slider ,Box} from '@mui/material'


function SilderProton({ value, changedPrice ,id}) {
  return (
    <Box sx={{ width: 100 }}>
    <div >
    <Slider
      value={value}
      onChange={changedPrice}
      valueLabelDisplay='on'
      min={1}
      max={200}
      
    />
  </div>
  </Box>
  )
}

export default SilderProton

{/* <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box> */}