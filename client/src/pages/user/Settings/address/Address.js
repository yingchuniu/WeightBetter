import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import AddressBlock from "./addressBlock/AddressBlock";
import { PrimaryButton } from "../../components/PrimaryButton";
import AddIcon from "@mui/icons-material/Add";
import FlexColBox from "@/components/FlexBox/FlexColBox";
import AddressModal from "./addressModal/AddressModal";
import AddressForm from "./addressForm/AddressForm";
import UserService from "@/services/user.service";

function Address() {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const [addressList, setAddressList] = useState([]);

    useEffect(() => {
        UserService.userAddress().then((res) => setAddressList(res.data.addressList));
    }, []);

    return (
        <FlexColBox>
            <Header title="我的地址" />
            <Box mt={3} alignSelf="flex-end">
                <PrimaryButton onClick={() => setOpen(true)} startIcon={<AddIcon />}>
                    新增地址
                </PrimaryButton>
            </Box>
            <br />
            <Stack spacing={3} width="100%">
                {addressList.map((address) => (
                    <AddressBlock
                        key={address.id}
                        setAddressList={setAddressList}
                        addressId={address.id}
                        recipient={address.recipient}
                        country={address.country}
                        township={address.township}
                        addressLine={address.address_line}
                    />
                ))}
            </Stack>

            <AddressModal open={open} handleClose={handleClose}>
                <AddressForm type="add" handleClose={handleClose} setAddressList={setAddressList}></AddressForm>
            </AddressModal>
        </FlexColBox>
    );
}

export default Address;
