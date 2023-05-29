import React from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Box, Typography, Stack } from "@mui/material";

function RegisterSuccess() {
    return (
        <Box mb={10}>
            <Stack direction="row" alignItems="center">
                <CheckCircleOutlineOutlinedIcon color="teal" fontSize="large" />
                <Typography variant="h2" color="initial" fontWeight="400">
                    帳號建立成功！
                </Typography>
            </Stack>
        </Box>
    );
}

export default RegisterSuccess;
