import React, { useEffect, useRef, useState } from 'react'
import { BottomNavigation,BottomNavigationAction, Box, Paper } from '@mui/material'
// import {LocationOn} from '@mui/icons-material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DescriptionIcon from '@mui/icons-material/Description';
import InsightsSharpIcon from '@mui/icons-material/InsightsSharp';
import SearchIcon from '@mui/icons-material/Search';
import CardStep from '../CardStep';
import MenuPlan from '../MenuPlan';
import PersonalPlan from '../PersonalPlan'


// import GoalCard from '../GoalCard';
// import LocationOnIcon from '@mui/icons-material/LocationOn';


function TopNav() {
    const [value, setValue] = useState(0);
    const ref = useRef()
    useEffect(()=>{
        ref.current.ownerDocument.body.scrollTop = 0;

    },[value]);
    return (
        <Box ref={ref} >
        {/* topNav Item */}
        {{
            0:<CardStep/>,
            1:<PersonalPlan/>,
            2:<MenuPlan/>,
          
            
        }[value]}
            <Paper
                elevation={3}
                sx={{ position: 'flexd', bottom: 0, left: 0, right: 0, zIndex: 2 }}
                >
                    <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(e,newValue)=>setValue(newValue)}
                    >

                    <BottomNavigationAction label='Plan' icon={<ModeEditIcon />}/>
                    <BottomNavigationAction label='Menu' icon={<DescriptionIcon />}/>
                    <BottomNavigationAction label='Search' icon={<SearchIcon/>}/>
                   
                    </BottomNavigation>
                </Paper>
        </Box>
    )
}

export default TopNav