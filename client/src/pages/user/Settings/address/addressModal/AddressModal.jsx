import React, { useState } from "react";
import { Typography, Box, Modal } from "@mui/material";

const style = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function AddressModal({ open, handleClose, children }) {
    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2" mb={2}>
                    編輯地址
                </Typography>
                {children}
            </Box>
        </Modal>
    );
}

export default AddressModal;
