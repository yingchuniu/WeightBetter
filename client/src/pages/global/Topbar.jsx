import React, { useContext, useState, useRef } from "react";
import {
    Box,
    IconButton,
    Typography,
    Button,
    Avatar,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    AppBar,
    Badge,
    MenuList,
    ListItemText,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AuthService from "../../services/auth.service";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../../hooks/AuthContext";
import { makeStyles } from "@mui/styles";

import logo from "@/assets/WB3.png";
import axios from "axios";
import { useCart } from "@/context/useCart";
// import {useSelector} from "react-redux"

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.main,
}));

const Logo = styled(Box)(({ theme }) => ({
    display: "flex",
}));

const Nav = styled(Box)(({ theme }) => ({
    display: "flex",
}));

const Search = styled("div")(({ theme }) => ({
    display: "none",
    position: "relative",
    backgroundColor: theme.palette.neutral.light,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up("md")]: {
        display: "flex",
    },
}));

const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    gap: "5px",
    [theme.breakpoints.up("md")]: {
        display: "flex",
    },
}));

const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "5px",
    [theme.breakpoints.up("md")]: {
        display: "none",
    },
}));

const pages = {
    短影音: "/video",
    部落格: "/blog",
    菜單: "/menu",
    商城: "/shop",
};

const Topbar = () => {
    const searchRef = useRef(null);
    const inputPlace = useRef()
    const timeoutRef = useRef(null);
const {items} = useCart()
    const auth = useAuth();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState([]);
    const navigate = useNavigate();
    const handleLogout = () => {
        setOpen(false);
        // 清空local storage
        AuthService.logout();
        window.alert("登出成功！回到登入頁");
        navigate("/");
        auth.userLogout();
    };
    const inputChange = (e, newValue) => {
        setSearch((p) => []);
        searchRef.current = e.target.value;
        
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            axios.get(`${process.env.REACT_APP_API_KEY}/user/search/${searchRef.current}`).then((res) => {
                setSearch(res.data);
                // console.log(res.data);
            });
        }, 300);

    };

    const getTotalQuantity = () => {
        let total = 0
        items.forEach(item => {
          total += item.quantity
        })
        return total
      }
    // console.log(cart)

    //創建useStyles鉤子，接收回調函數theme
    const useStyles = makeStyles((theme) => ({
        topBarButton: {
          marginX: theme.spacing(1),
          color: theme.palette.yellow.main,
          display: "block",
          //嵌套選擇器 - 保證不會被ＭＵＩ預設給覆蓋
          '&.MuiButton-root': {
            color: theme.palette.yellow.main,
          },
        },
      }));

      const classes = useStyles();


    return (
        // 在註冊與登入頁面不顯示 Navbar
        // <div className={`${location.pathname === "/login" || `${location.pathname}` === "/register" ? "hidden" : ""}`}>
        <AppBar position="sticky">
            <StyledToolbar p={1.5} bgcolor="primary.main">
                <Logo sx={{ mr: 2 }}>
                    <Typography alignSelf={"center"} sx={{ "&:hover": { cursor: "pointer" } }}>
                        <img src={logo} alt="logo" style={{ height: "32px" }} onClick={() => navigate("/")} />
                    </Typography>
                </Logo>
                <Nav sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
                    {Object.keys(pages).map((page) => (
                        <Button
                            key={page}
                            className={classes.topBarButton}
                            onClick={() => {
                                if (page === "商城") {
                                    navigate("/shop");
                                } else if (page === "菜單") {
                                    navigate("/menu");
                                } else if (page === "短影音") {
                                    navigate("/reels/home");
                                } else if (page === "部落格") {
                                    navigate("/blog");
                                }
                            }}>
                            {page}
                        </Button>
                    ))}
                </Nav>
                <Search>
                    <InputBase size="small" ref={inputPlace} placeholder="搜尋用戶..." onChange={inputChange} sx={{ marginX: "10px" }} />
                    {search.length > 0 && (
                        <MenuList
                            sx={{
                                position: "absolute",
                                top: "100%",
                                zIndex: "10",
                                width: "100%",
                                backgroundColor: `${search.length < 0 ? "transparent" : "neutral.light"}`,
                            }}>
                            {search.map((value, i) => (
                                <MenuItem
                                    key={i}
                                    onClick={() => {
                                        setSearch([]);
                                        inputPlace.current.value = ""
                                        navigate(`${value.username}`);
                                    }}>
                                    <ListItemText sx={{ fontSize: "5px" }}>{value.username}</ListItemText>
                                </MenuItem>
                            ))}
                        </MenuList>
                    )}
                </Search>
                <Icons>
                    <IconButton type="button">
                        <SearchOutlinedIcon />
                    </IconButton>
                    {auth.currentUser && (
                        <IconButton>
                            <Badge badgeContent={4} color="pink">
                                <NotificationsOutlinedIcon />
                            </Badge>
                        </IconButton>
                    )}
                    {auth.currentUser && (
                        <IconButton>
                            <Link to={`/Shop/Cart`}><Badge badgeContent={getTotalQuantity() || 0} color="pink">
                            
                                <ShoppingCartIcon />
                            </Badge></Link>
                        </IconButton>
                    )}
                    {auth.currentUser ? (
                        <IconButton onClick={handleLogout}>
                            <LogoutOutlinedIcon />
                        </IconButton>
                    ) : (
                        <IconButton onClick={() => navigate("/login")}>
                            <PowerSettingsNewOutlinedIcon />
                        </IconButton>
                    )}
                    {auth.currentUser && (
                        <IconButton onClick={() => setOpen(true)}>
                            <Avatar
                                alt="profile_image"
                                sx={{ width: "30px", height: "30px" }}
                                src={auth.currentUser?.profile_image || "/imagesStory/users/user.png"}
                            />
                        </IconButton>
                    )}
                </Icons>
                <UserBox>
                    {/* <Typography>{currentUser.username}</Typography> */}
                    {/* <IconButton onClick={() => navigate(`/user/${currentUser.username}`)}> */}
                    <IconButton onClick={() => setOpen(true)}>
                        <Avatar
                            alt="profile_image"
                            sx={{ width: "30px", height: "30px" }}
                            src={auth.currentUser?.profile_image || "/imagesStory/users/user.png"}
                        />
                    </IconButton>
                </UserBox>
            </StyledToolbar>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={(e) => setOpen(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}>
                <MenuItem
                    onClick={(e) => {
                        setOpen(false);
                        navigate(`/${auth.currentUser.username}`);
                    }}>
                    個人檔案
                </MenuItem>
                <MenuItem
                    onClick={(e) => {
                        setOpen(false);
                        navigate(`/settings`);
                    }}>
                    帳號資訊
                </MenuItem>
                <MenuItem onClick={handleLogout}>登出</MenuItem>
            </Menu>
        </AppBar>
        // </div>
    );
};

export default Topbar;
