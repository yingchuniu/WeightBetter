import { Button, styled } from "@mui/material";

export const TealButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: theme.palette.teal.main,
    "&:hover": {
        backgroundColor: theme.palette.teal.dark,
    },
    "&:disabled": {
        backgroundColor: theme.palette.teal.light,
    },
}));

export const PinkButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: theme.palette.pink.main,
    "&:hover": {
        backgroundColor: theme.palette.pink.dark,
    },
    "&:disabled": {
        backgroundColor: theme.palette.pink.light,
    },
}));
