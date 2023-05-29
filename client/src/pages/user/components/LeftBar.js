// hooks
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/AuthContext";
import { useParams } from "react-router-dom";
import UserService from "@/services/user.service";
import AuthService from "../../../services/auth.service";
import { CircularProgress } from "@mui/material";
// ANCHOR
import jwt_decode from "jwt-decode";

// components
import { Box, Stack, Avatar, Typography, Breadcrumbs, IconButton, Snackbar, Alert, FormGroup, Chip, Fade } from "@mui/material";
import PopupModal from "./PopupModal";
import AvatarBar from "./avatar/AvatarBar";
import { PrimaryButton } from "./PrimaryButton";
// icons
import EditIcon from "@mui/icons-material/Edit";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const LeftBar = () => {
    // ANCHOR
    const decodedToken = jwt_decode(AuthService.getCurrentUser().token);
    const params = useParams();
    const { currentUser } = useAuth();
    // modal states
    const [fanOpenState, setfanOpenState] = useState(false);
    const fanOpen = () => setfanOpenState(true);
    const fanClose = () => setfanOpenState(false);
    const [followOpenState, setfollowOpenState] = useState(false);
    const followOpen = () => setfollowOpenState(true);
    const followClose = () => setfollowOpenState(false);
    // leftbar information states
    const [user, setUser] = useState({});
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [followStatus, setFollowStatus] = useState();
    const [openAlert, setOpenAlert] = useState(false);
    // upload image
    const [loading, setLoading] = useState(false);

    // fetch page user info
    const usernameParams = params.username;
    // FIXME error handling ?
    useEffect(() => {
        UserService.userProfile(usernameParams).then((res) => {
            if (res.data.error) {
                throw new Error("查無此用戶");
            }
            setUser(res.data);
        });

        UserService.userFollowing(usernameParams).then((res) => {
            setFollowing(res.data);
        });

        UserService.userFollowers(usernameParams).then((res) => {
            setFollowers(res.data);
            setFollowStatus(res.data.filter((fan) => fan.follower_id === decodedToken.id).length === 1 ? true : false);
        });
    }, [followStatus, decodedToken.id, usernameParams, user.profile_image]);

    // 點擊follow / unfollow
    const followUser = (e) => {
        UserService.userFollow(usernameParams, decodedToken.id).then((res) => {
            setFollowStatus(!followStatus);
            setOpenAlert(true);
        });
    };

    // modal unfollow
    const unfollowUser = (username) => {
        UserService.userFollow(username, decodedToken.id);
        setFollowing(following.filter((follow) => follow.username !== username));
    };

    // 換大頭貼
    const avatarChange = (e) => {
        // setProfile_image(e.target.files[0]);
        setLoading(true);
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        UserService.userAvatar(decodedToken.username, formData).then((res) => {
            setUser({ ...user, profile_image: res.toString() });
            setLoading(false);
        });
    };

    const deleteFan = (username) => {
        UserService.userDelFan(username, currentUser.id);
        setFollowers(followers.filter((fan) => fan.username !== username));
    };

    return (
        <Box flex={1} p={2}>
            {decodedToken.username !== usernameParams && (
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={openAlert}
                    onClose={() => setOpenAlert(false)}
                    TransitionComponent={Fade}
                    autoHideDuration={1000}>
                    <Alert severity="success" sx={{ width: "100%" }}>
                        {followStatus && `正在追蹤${usernameParams}`}
                        {!followStatus && `已取消追蹤${usernameParams}`}
                    </Alert>
                </Snackbar>
            )}
            <Stack direction="column" spacing={2} alignItems="center" pt={5}>
                {!loading ? (
                    <Box position={"relative"}>
                        <Avatar alt="profile_image" src={user.profile_image} sx={{ width: 300, height: 300 }} />

                        {decodedToken.username === usernameParams && (
                            <IconButton
                                size="large"
                                color="primary"
                                aria-label="upload picture"
                                component="label"
                                sx={{
                                    position: "absolute",
                                    bottom: "10%",
                                    right: "10%",
                                    "&:hover": { bgcolor: "primary.main" },
                                }}>
                                <input hidden accept="image/*" type="file" onChange={avatarChange} />
                                <CameraAltIcon fontSize="inherit" color="primary" sx={{ "&:hover": { color: "whitesmoke" } }} />
                            </IconButton>
                        )}
                    </Box>
                ) : (
                    <Box sx={{ width: 300, height: 300, position: "relative" }}>
                        <CircularProgress
                            sx={{ position: "absolute", top: "50%", left: "50%", translate: "-50%" }}
                            color="primary"
                            size={60}
                        />
                    </Box>
                )}
                <Typography variant="h3" fontWeight={600} color="initial">
                    {user.fullname}
                </Typography>
                <Typography variant="h4" color="initial">
                    {user.username}
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Box>
                        <Typography
                            onClick={fanOpen}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                "&:hover": { cursor: "pointer" },
                            }}>
                            <PeopleIcon sx={{ mr: 1 }} fontSize="inherit" />
                            {followers.length} 位粉絲
                        </Typography>
                        <PopupModal handleClose={fanClose} open={fanOpenState} title="粉絲">
                            {followers.map((follow, i) => (
                                <AvatarBar
                                    key={i}
                                    username={follow.username}
                                    profile_image={follow.profile_image}
                                    situation={"fan"}
                                    // setFollowStatus={setFollowStatus}
                                    deleteFan={deleteFan}
                                    followClose={fanClose}></AvatarBar>
                            ))}
                        </PopupModal>
                    </Box>
                    <Box>
                        <Typography
                            onClick={followOpen}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                "&:hover": { cursor: "pointer" },
                            }}>
                            {following.length} 追蹤中
                        </Typography>
                        <PopupModal handleClose={followClose} open={followOpenState} title="追蹤中">
                            {following.map((fan, i) => (
                                <AvatarBar
                                    key={i}
                                    username={fan.username}
                                    profile_image={fan.profile_image}
                                    setFollowStatus={setFollowStatus}
                                    unfollowUser={unfollowUser}
                                    situation={"following"}
                                    followClose={followClose}></AvatarBar>
                            ))}
                        </PopupModal>
                    </Box>
                </Breadcrumbs>
                <FormGroup>
                    {/* <FormControlLabel control={<Switch defaultChecked />} label="公開個人資訊" /> */}
                    <Chip label={user.state} color="primary" variant="outlined" />
                </FormGroup>
                {decodedToken.username === usernameParams && (
                    <PrimaryButton endIcon={<EditIcon />} fullWidth>
                        編輯自介
                    </PrimaryButton>
                )}
                {decodedToken.username !== usernameParams && !followStatus && (
                    <PrimaryButton onClick={followUser} endIcon={<PersonAddIcon />} fullWidth>
                        Follow
                    </PrimaryButton>
                )}
                {decodedToken.username !== usernameParams && followStatus && (
                    <PrimaryButton
                        variant="outlined"
                        sx={{
                            bgcolor: "whitesmoke",
                            color: "primary.main",
                            "&:hover": { backgroundColor: "whitesmoke" },
                            // border: "2px solid",
                        }}
                        onClick={followUser}
                        endIcon={<PersonRemoveIcon />}
                        fullWidth>
                        unFollow
                    </PrimaryButton>
                )}
            </Stack>
        </Box>
    );
};

export default LeftBar;
