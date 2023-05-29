import React from "react";
import { Typography, styled } from "@mui/material";
import FlexColBox from "@/components/FlexBox/FlexColBox";

const Subtitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.neutral.main,
}));

function AuthHeader({ children, subtitle }) {
    return (
        <FlexColBox mb={3}>
            <Typography variant="h3" mb={1} fontWeight="500">
                {children}
            </Typography>
            <Subtitle variant="h5">{subtitle}</Subtitle>
        </FlexColBox>
    );
}

export default AuthHeader;
