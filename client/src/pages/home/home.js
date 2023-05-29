import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

// --[分區]

import MenuPage from "./component/MenuPage/MenuPage";

// --[分區]
import FirstPage from "./component/FirstPage/FirstPage";
import HomeStory from "./component/story/HomeStory";
import HomeShop from "./component/Shop/HomeShop";
import HomeDesign from "../blog/Pages/HomeDesign/HomeDesign";

const Home = () => {
    const { userLogin } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [rerender, setRerender] = useState(false);

    return (
        <div className="HomeWrapper">
            <FirstPage />
            <HomeStory />
            <HomeDesign />
            <MenuPage />
            <HomeShop></HomeShop>
        </div>
    );
};

export default Home;
