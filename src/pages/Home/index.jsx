import React from 'react';
import Navbar from "../../components/General/Navbar";
import GetBanners from "../../Layout/General/GetBanners";
import Promo from "../../Layout/General/Promo";
import Category from "../../Layout/General/Category";
import Activity from "../../Layout/General/Activity";
import Faq from "../../components/General/Faq";
import Footer from "../../components/General/Footer";
// import ErrorPage from "../ErrorPage";

const Home = () => {
    return (
        <div>
            <Navbar />
            <GetBanners />
            <Promo />
            <Category />
            <Activity />
            <Faq />
            <Footer />
            {/* <ErrorPage /> */}
        </div>
    );
};

export default Home;