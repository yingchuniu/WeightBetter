// hooks
import { useAuth } from "@/hooks/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
// components
import { Box, Input, InputLabel, InputAdornment, FormControl, Button, Paper } from "@mui/material";
import { TealButton } from "../../components/TealButton";
// icons
import EmailIcon from "@mui/icons-material/Email";
import UserService from "@/services/user.service";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BoyIcon from "@mui/icons-material/Boy";
import InterestsIcon from "@mui/icons-material/Interests";
import PaletteIcon from "@mui/icons-material/Palette";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { styled } from "@mui/system";

const tablist = [
    { name: "email", label: "Email", icon: <EmailIcon size="small" /> },
    { name: "fullname", label: "姓名", icon: <BoyIcon size="small" /> },
    { name: "interest", label: "興趣", icon: <InterestsIcon size="small" /> },
    {
        name: "introduction",
        label: "自我介紹",
        icon: <PaletteIcon size="small" />,
        type: "textarea",
    },
    {
        name: "state",
        label: "會員等級",
        icon: <MilitaryTechIcon size="small" />,
        disabled: true,
    },
];

function Profile() {
    const { currentUser } = useAuth();
    const params = useParams();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState();
    const [editStatus, seteditStatus] = useState(false);

    const usernameParams = params.username;

    useEffect(() => {
        UserService.userProfile(usernameParams).then((res) => {
            setProfileData(res.data);
        });
    }, [usernameParams]);

    // change ProfileData
    const inputChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    console.log(profileData);
    const handleSubmit = () => {
        seteditStatus(!editStatus);
        if (editStatus === true) {
            const { email, fullname, interest, introduction } = profileData;
            UserService.updateUser(currentUser.id, {
                email,
                fullname,
                interest,
                introduction,
            }).then((res) => {});
        }
    };

    return (
        <Box display={"flex"} flexDirection="column" justifyContent="center" m={"20px"}>
            <Paper
                variant="outlined"
                square
                sx={{
                    padding: "30px 5px",
                    borderColor: "primary.light",
                    borderRadius: "8px",
                    backgroundColor: "neutral.light",
                }}>
                <Box
                    sx={{ "& > :not(style)": { m: 1 }, alignItems: { sm: "start" } }}
                    display="flex"
                    flexDirection={"column"}
                    alignItems={"center"}
                    marginX={3}>
                    {tablist.map((field, i) => (
                        <FormControl variant="standard" key={i} label={'margin="normal"'} fullWidth>
                            <InputLabel sx={{ color: "primary.dark", marginY: "-5px" }} htmlFor={field.name}>
                                {field.label}
                            </InputLabel>
                            <Input
                                type={field.type || "text"}
                                disabled={field.disabled || !editStatus}
                                id={field.name}
                                name={field.name}
                                onChange={inputChange}
                                sx={{ fontSize: "14px" }}
                                value={profileData?.[field.name] || ""}
                                startAdornment={<InputAdornment position="start">{field.icon}</InputAdornment>}></Input>
                        </FormControl>
                    ))}
                </Box>
                <Box display={"flex"} justifyContent="center" mt={3}>
                    {currentUser.username === usernameParams && (
                        <Button
                            sx={{ maxWidth: "200px" }}
                            color="primary"
                            disabled={false}
                            size="small"
                            variant="outlined"
                            onClick={handleSubmit}>
                            {editStatus ? "儲存" : "編輯"}
                        </Button>
                    )}
                </Box>
            </Paper>
        </Box>
    );
}

export default Profile;
