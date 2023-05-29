import React from 'react'
import Button from '@mui/material/Button';
import styles from './style.module.css'

function RectButton(props) {
  console.log(props)

  // --[all]
  const size = props.size || '50'
  const fontColor = props.fontColor || 'black.main'
  const fontSize = props.fontSize || '14'
  const type = props.type || 'contained'
  const text = props.text || '確定'

  // --[contained]
  const bgColor = props.bgColor || 'pink.main'

  // --[outlined]
  const borderColor = props.borderColor || 'pink.main'

  return (
    <>
    {type === 'contained'? 
      <Button
          className={styles.BtnRect}
          sx={{
            backgroundColor: bgColor,
            color: fontColor,
            fontSize: fontSize + 'px',
            borderRadius: '100px',
            width: size + 'px',
            height: size + 'px',
            // boxShadow: '1px 1px 3px #555',
          }}
        >{text}</Button> : 
        <Button
          id="btnO"
          className={styles.BtnRect}
          sx={{
            color: fontColor,
            fontSize: fontSize + 'px',
            borderRadius: '100px',
            width: size + 'px',
            height: size + 'px',
            // boxShadow: '1px 1px 3px #555',
            borderWidth: '3px',
            borderColor: borderColor,
          }}
        >{text}</Button>
      }
      
    </>
  )
}

export default RectButton
