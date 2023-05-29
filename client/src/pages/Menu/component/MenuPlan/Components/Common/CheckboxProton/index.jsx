import { Checkbox,FormGroup } from '@mui/material'
import React from 'react'
import { FormControlLabel , Box } from '@mui/material';
// import { makeStyles } from '@mui/material'



  const CheckboxProton = ({ changeChecked, checked, label, id }) => {
    // const classes = useStyles();
    //const { checked, label, id } = otherProps;

    // console.log('L11 ',id)
    return (
      <div>
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormGroup>
        <FormControlLabel
         
          control={
            <Checkbox
              
              size='small'
              checked={checked}
              onChange={() => changeChecked(id)}
              inputProps={{ 'aria-label': 'checkbox with small size' }}
            />
          }
          label={label}
        />
          
        </FormGroup>
        </Box>

      </div>
    );
  };
  
  export default CheckboxProton;







// function CheckboxProton({cuisine,changeChecked}) {
//     const{checked,label,id}=cuisine;
//   return (
//     <div>
//     <FromControlLabel
//     label:label

//     size='small'
//     checked={checked}
//     onChange={()=>changeChecked(id)}
   

//     />
    
//     </div>
//   )
// }

// export default CheckboxProton