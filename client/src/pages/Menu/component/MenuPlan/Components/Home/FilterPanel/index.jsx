// import { CheckBox } from '@mui/icons-material'
import React from 'react'
import { categoryList, ratingList } from '../../../Contents'
import CheckboxProton from '../../Common/CheckboxProton'
import FilterListToggle from '../../Common/FilterListToggle'
import SliderProton from '../../Common/SliderProton'
import './styles.css'
import { Box } from '@mui/material';



function FileterPanel(
  { selectedCategory,
    selectToggle,
    selectCategory,
    selectedRating,
    selectRating,
    cuisines,
    changeChecked,
    changePrice,
    selectedPrice,
  }

) {
  return (
    <div>
      {/* Category 素食 一般*/}
      <div className='input-group'>
        <p className='label'>種類</p>
        <Box  sx={{pl:'1.6rem'  }} >
        <FilterListToggle
          options={categoryList}
          value={selectedCategory}
          selectToggle={selectCategory}
        />
        </Box>
      </div>

      {/* Cusines  減脂 正常 增肌*/}
      <div className='input-group'>
        <p className='label'>時段</p>
        {/* <CheckboxProton/> */}
        <Box sx={{pl:'0.3rem'  }}>
          {cuisines.map((cuisine) => (
            <CheckboxProton
              key={cuisine.id}
              id={cuisine.id}
              // cuisine={cuisine.label}
              checked={cuisine.checked}
              label={cuisine.label}
              changeChecked={changeChecked}
            />
          ))}
        </Box>

      </div>


      {/* Price Range (Calories) */}
      <div className='input-group'>
        <p className='label'>卡路里</p>
        <Box  sx={{pl:'1rem'  }}>
          <SliderProton 
         
          value={selectedPrice} 
          changedPrice={changePrice} 
          
          />
        </Box>
      </div>
   
      {/* Star Rating */}
      <div className='input-group'>
        <p className='label'>Star Rating</p>
        <FilterListToggle
          options={ratingList}
          value={selectedRating}
          selectToggle={selectRating}
        />

      </div>



    </div>
  )
}

export default FileterPanel