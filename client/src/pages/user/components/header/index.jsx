import React from "react";
import { Box, Typography, Stack } from "@mui/material";

function Header({ title }) {
    return (
        <Box width="100%">
            <Stack direction="column" spacing={2}>
                <Typography variant="h2" fontWeight="500" color="primary.main" pl={2}>
                    {title}
                </Typography>
                <Box height="3px" width="100%" bgcolor="primary.main"></Box>
            </Stack>
        </Box>
    );
}

export default Header;
