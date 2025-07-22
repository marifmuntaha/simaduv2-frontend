import React from "react";
import { Outlet } from "react-router-dom";
import Head from "./head";
import {ToastContainer} from "react-toastify";

const Layout = ({title}) => {

    return (
        <React.Fragment>
            <Head title={!title && 'Loading'} />
            <div className="nk-app-root">
                <div className="nk-wrap nk-wrap-nosidebar">
                    <div className="nk-content">
                        <Outlet />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </React.Fragment>
    );
};
export default Layout;
