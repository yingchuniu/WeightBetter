import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FlexColBox from "@/components/FlexBox/FlexColBox";
import styled from "@emotion/styled";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "5px solid #6677C8",
    boxShadow: 24,
    p: 4,
};

const AvatarContainer = styled(Box)(() => ({
    alignItems: "flex-start",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    gap: "3px",
}));

export default function PopupModal({ open, handleClose, title, children }) {
    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
                    {title}
                </Typography>
                <AvatarContainer>{children}</AvatarContainer>
            </Box>
        </Modal>
    );
}
