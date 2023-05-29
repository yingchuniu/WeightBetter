// src/Components/SubscribeForm.js
import * as React from "react";
import { Box, Button, TextField, Typography, Snackbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

export default function SubscribeForm() {
    const [email, setEmail] = React.useState("");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("http://localhost:8080/blogs/subscribe", { email })
            .then(() => {
                console.log("訂閱成功");
                setEmail("");
                setOpenSnackbar(true);
            })
            .catch((error) => {
                console.error("訂閱失敗：", error);
            });
    };

    const theme = useTheme();

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
            }}
        >
            <Typography variant="h5" component="div">
                訂閱我們的部落格
            </Typography>
            <TextField
                label="輸入您的電子郵件"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Button
                type="submit"
                variant="contained"
                sx={{
                    backgroundColor: theme.palette.primary.light,
                }}
            >
                訂閱
            </Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message="訂閱成功！"
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </Box>
    );
}
