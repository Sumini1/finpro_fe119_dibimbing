import React from 'react';
import Navbar from "../../components/General/Navbar";
import GetBanners from "../../Layout/General/GetBanners";
import Promo from "../../Layout/General/Promo";
import Category from "../../Layout/General/Category";
import Activity from "../../Layout/General/Activity";

const Home = () => {
    return (
        <div>
            <Navbar />
            <GetBanners />
            <Promo />
            <Category />
            <Activity />
        </div>
    );
};

export default Home;