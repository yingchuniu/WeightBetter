import { Button, styled } from "@mui/material";

export const PrimaryButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
    "&:disabled": {
        backgroundColor: theme.palette.primary.light,
    },
}));
