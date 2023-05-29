import React, { useEffect, useMemo, useState } from "react";
import SettingList from "./SettingList";
import { Outlet } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { useAuth } from "@/hooks/AuthContext";
import { useLocation } from "react-router-dom";

const urlToTab = {
    billing: 1,
    historyorders: 2,
    updatepassword: 3,
    address: 4,
};

const Settings = () => {
    const location = useLocation();
    const { currentUser } = useAuth();
    // selected tab control
    const [selectedTab, setSelectedTab] = useState(0);
    // url to selected tab control
    const path = useMemo(() => location.pathname.split("/")[2], [location]);

    useEffect(() => {
        setSelectedTab(urlToTab[path] || 0);
    }, [path]);

    return (
        <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
            <Grid container spacing={2}>
                <Grid item xs={2} md={3} lg={2}>
                    <SettingList user={currentUser} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                </Grid>
                <Grid item xs={10} md={9} lg={10}>
                    <Outlet />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Settings;
