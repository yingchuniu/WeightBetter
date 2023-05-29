import React from "react";
import { Box, Grid, Typography, styled, Paper } from "@mui/material";
import Logo from "@/assets/WB3.png";
import FlexColBox from "@/components/FlexBox/FlexColBox";
import background from "@/assets/background.jpg";

const AuthWrapper = ({ children }) => {
    return (
        <Box
            sx={{
                height: "calc(100vh - 64px)",
                // backgroundImage: `url(${'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80'})`,
                // backgroundImage: "url(/ImagesShop/5307.png)",
                // backgroundColor: "purple",
                // backgroundSize: "cover",
                // backgroundPosition: "left",
                // paddingTop: 10,
                // position:"relative",
                display: 'flex',
                

            }}
            >
            <div className="imgBox" style={{width: '60%', height: '100%'}} >
                <img src="/ImagesShop/5307.png" style={{width: '100%', height: '100%', objectFit: 'cover'}} alt="bg" />
            </div>
            <FlexColBox
                maxWidth={400}
                maxHeight={'90%'}
                padding={3}
                borderRadius={1}
                boxShadow={"5px 5px 10px #666"}
                margin={'auto'}
                // sx={{ position: "absolute", background:"rgba(255,255,255,.8)",
                // right:'15%'
                //  }}
                >
                {children}
            </FlexColBox>
        </Box>
    );
};

export default AuthWrapper;
