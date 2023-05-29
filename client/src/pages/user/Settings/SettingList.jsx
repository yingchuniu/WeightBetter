import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PaymentIcon from "@mui/icons-material/Payment";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import BusinessIcon from "@mui/icons-material/Business";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
// component
import AvatarProfile from "../components/avatar/AvatarProfile";

const settings = [
    { title: "帳號", icon: <AdminPanelSettingsIcon />, link: "" },
    { title: "訂閱資訊", icon: <SubscriptionsIcon />, link: "billing" },
    { title: "歷史訂單", icon: <ListAltIcon />, link: "historyorders" },
    { title: "密碼安全", icon: <VpnKeyIcon />, link: "updatepassword" },
    { title: "我的地址", icon: <BusinessIcon />, link: "address" },
    { title: "付款資訊", icon: <PaymentIcon /> },
];

export default function SettingList({ user, selectedTab, setSelectedTab }) {
    const navigate = useNavigate();
    return (
        <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="settings-list-subheader"
            subheader={
                <ListSubheader component="div" id="settings-list-subheader">
                    <AvatarProfile user={user} />
                </ListSubheader>
            }>
            <br />
            {settings.map((item, i) => (
                <ListItemButton
                    key={i}
                    onClick={() => {
                        navigate(item.link);
                        setSelectedTab(i);
                    }}
                    selected={selectedTab === i ? true : false}
                    sx={{
                        "&.Mui-selected": {
                            color: "primary.main",
                        },
                    }}>
                    <ListItemIcon sx={{ color: `${selectedTab === i ? "primary.main" : ""}` }}>{item.icon}</ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{ fontSize: 16, fontWeight: `${selectedTab === i ? "700" : "400"}` }}
                        primary={item.title}
                    />
                </ListItemButton>
            ))}
        </List>
    );
}
