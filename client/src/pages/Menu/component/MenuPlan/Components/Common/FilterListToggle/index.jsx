import React from 'react'

import { ToggleButtonGroup, ToggleButton } from '@mui/material';



const FilterListToggle = ({ options, value, selectToggle }) => {
  return (
    <ToggleButtonGroup
      value={value}
      onChange={selectToggle}
      style={{ width: '100%', justifyContent: 'space-between' }}
      exclusive


    >
      {options.map(({ label, id, value }) => (
        <ToggleButton
          key={id}
          value={value}>
          {label}
        </ToggleButton>
      ))}

      {/* <ToggleButton>PLACES</ToggleButton>
      <ToggleButton>DISHES</ToggleButton> */}
    </ToggleButtonGroup>

  )
}

export default FilterListToggle