import React from "react";
import Header from "../../components/header";
import { Alert, Box, Stack } from "@mui/material";

const Account = () => {
    return (
        <Box>
            <Header title="帳號" />
            <Box padding={2}>
                <Alert severity="warning">更改帳號名稱可能會造成副作用</Alert>
                <Stack></Stack>
            </Box>
        </Box>
    );
};

export default Account;
