import { useState } from "react";
import { Box, Typography, Stack, Tooltip, IconButton, Chip } from "@mui/material";
import FlexColBox from "@/components/FlexBox/FlexColBox";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { styled } from "@mui/material/styles";
import AddressModal from "../addressModal/AddressModal";
import AddressForm from "../addressForm/AddressForm";
import UserService from "@/services/user.service";

// const DefaultBox = styled(Box)(({ theme }) => ({
//     border: "1px solid ",
//     padding: "5px",
//     borderRadius: "8px",
//     borderColor: theme.palette.teal.main,
// }));

const AddressWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    boxShadow: "3px 3px 3px gray",
    borderBottom: "1px solid gray",
    borderRadius: "8px",
    position: "relative",
}));

function AddressBlock({ recipient, country, addressLine, township, defaultSelect, addressId, setAddressList }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDelete = () => {
        UserService.userDeleteAddress(addressId).then((res) => {
            setAddressList((p) => p.filter((address) => address.id !== addressId));
            // console.log(res.data);
        });
    };
    return (
        <AddressWrapper>
            <Stack justifyContent="space-between" direction={"row"} marginX={5} marginY={2}>
                <FlexColBox sx={{ alignItems: "flex-start" }}>
                    <Typography fontWeight={"600"} variant="h5" color="black.main">
                        {recipient}
                    </Typography>
                    <Stack direction={"row"}>
                        <Typography variant="h5" color="black.main">
                            {country}
                        </Typography>
                        <Box alignSelf={"center"} width={"1px"} bgcolor="primary.main" height={"80%"} marginX="2px"></Box>
                        <Typography variant="h5" color="black.main">
                            {township}
                        </Typography>
                    </Stack>
                    <Typography variant="h5" color="black.main">
                        {addressLine}
                    </Typography>
                </FlexColBox>
                <FlexColBox>
                    <Stack direction={"row"} mb={2}>
                        <IconButton size="small" onClick={handleOpen}>
                            {/* <EditIcon /> */}編輯
                        </IconButton>
                        <Tooltip title="刪除">
                            <IconButton size="small" onClick={handleDelete} sx={{ position: "absolute", top: 0, right: 0 }}>
                                <HighlightOffRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    {/* <DefaultBox> */}
                    {/* <Typography variant="h6" color="black">
                            設為預設
                        </Typography> */}
                    <Chip variant="outlined" color="teal" label="預設地址" />
                    {/* </DefaultBox> */}
                </FlexColBox>
            </Stack>
            <AddressModal open={open} handleClose={handleClose}>
                <AddressForm handleClose={handleClose} type="edit" addressId={addressId} setAddressList={setAddressList}></AddressForm>
            </AddressModal>
        </AddressWrapper>
    );
}

export default AddressBlock;
