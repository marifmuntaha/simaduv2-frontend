import React from "react";
import { Outlet } from "react-router-dom";
import Head from "./head";
import Header from "./header";
import Footer from "./footer";
import AppRoot from "./global/AppRoot";
import AppMain from "./global/AppMain";
import AppWrap from "./global/AppWrap";
import Sidebar from "./sidebar";
import {ToastContainer} from "react-toastify";


const Layout = ({title}) => {
    return (
        <React.Fragment>
            <Head title={!title && 'Loading'} />
            <AppRoot>
                <AppMain>
                    <Sidebar fixed />
                    <AppWrap>
                        <Header fixed />
                        <Outlet />
                        <Footer />
                    </AppWrap>
                </AppMain>
            </AppRoot>
            <ToastContainer />
        </React.Fragment>
    );
};
export default Layout;
