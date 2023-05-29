import React, { useState } from "react";
import { FormControl, InputLabel, Input, InputAdornment, IconButton, FormHelperText } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function PasswordInput({ label, name, value, setValue, error }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
            <Input
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={(e) => setValue(e)}
                name={name}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}>
                            {showPassword ? <VisibilityOff color="primary" /> : <Visibility color="primary" />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText error>{error}</FormHelperText>
        </FormControl>
    );
}

export default PasswordInput;
