import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircleSpinner({size, color}) {
    return (
        <Box sx={{ display: "flex" }}>
            <CircularProgress color={color || "white"} size={size || 20} />
        </Box>
    );
}
