import { useState } from "react";
import { Box, InputBase, Stack, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { countries, townships, postcodes } from "../addressData";
import { PrimaryButton } from "@/pages/user/components/PrimaryButton";
import { TealButton, PinkButton } from "@/pages/user/components/TealButton";
import UserService from "@/services/user.service";
import { textInput } from "@/Styles/inputMui";

function AddressForm({ type, handleClose, setAddressList, addressId }) {
    const [recipient, setRecipient] = useState("");
    const [countryIndex, setCountryIndex] = useState(-1);
    const [townshipIndex, setTownshipIndex] = useState(-1);
    const [addressLine, setAddressLine] = useState("");

    const handleCountryChange = (e) => {
        setCountryIndex(+e.target.value);
        setTownshipIndex(-1);
    };
    const handleTownshipChange = (e) => {
        setTownshipIndex(+e.target.value);
    };
    const handleDetailChange = (e) => {
        setAddressLine(e.target.value);
    };
    const handleRecipientChange = (e) => {
        setRecipient(e.target.value);
    };

    if (countryIndex !== -1) console.log(recipient, countries[countryIndex], townships[countryIndex][townshipIndex], addressLine);

    const handleSubmit = () => {
        if (type === "add") {
            UserService.userAddAddress({
                recipient: recipient,
                country: countries[countryIndex],
                township: townships[countryIndex][townshipIndex],
                address_line: addressLine,
            }).then((res) => console.log(res.data));
            setAddressList((p) => [
                ...p,
                {
                    recipient: recipient,
                    country: countries[countryIndex],
                    township: townships[countryIndex][townshipIndex],
                    address_line: addressLine,
                },
            ]);
        }
        if (type === "edit") {
            UserService.userUpdateAddress({
                id: addressId,
                recipient: recipient,
                country: countries[countryIndex],
                township: townships[countryIndex][townshipIndex],
                address_line: addressLine,
            }).then((res) => console.log(res.data));
            setAddressList((address) =>
                address.map((item) =>
                    item.id === addressId
                        ? {
                              id: addressId,
                              recipient: recipient,
                              country: countries[countryIndex],
                              township: townships[countryIndex][townshipIndex],
                              address_line: addressLine,
                          }
                        : item
                )
            );
        }

        handleClose();
    };

    return (
        <Box>
            <Stack spacing={3} mt={5}>
                <TextField
                    label="收件人"
                    sx={{ ...textInput }}
                    size="small"
                    value={recipient}
                    onChange={handleRecipientChange}
                    name="recipient"
                />
                <Stack direction={"row"}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="country">城市</InputLabel>
                        <Select
                            labelId="country"
                            id="country"
                            value={countryIndex}
                            onChange={handleCountryChange}
                            label="城市"
                            MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            <MenuItem value={-1}>
                                <em>請選擇城市</em>
                            </MenuItem>
                            {countries.map((county, i) => (
                                <MenuItem key={i} value={i}>
                                    {county}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="township">區域</InputLabel>
                        <Select
                            labelId="township"
                            id="township"
                            value={townshipIndex}
                            onChange={handleTownshipChange}
                            label="區域"
                            MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
                            <MenuItem value={-1}>
                                <em>請選擇區域</em>
                            </MenuItem>
                            {countryIndex > -1 &&
                                townships[countryIndex].map((township, i) => (
                                    <MenuItem key={i} value={i}>
                                        {township}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Stack>
                <TextField
                    label="街道,巷弄,門號,樓層"
                    sx={{ ...textInput, width: "300px" }}
                    size="small"
                    value={addressLine}
                    onChange={handleDetailChange}
                    name="addressLine"
                />
                <Stack direction={"row"} spacing={4} justifyContent="center">
                    <PinkButton onClick={handleClose}>取消</PinkButton>
                    <TealButton onClick={handleSubmit}>{type === "add" ? "新增" : "儲存"}</TealButton>
                </Stack>
            </Stack>
        </Box>
    );
}

export default AddressForm;
