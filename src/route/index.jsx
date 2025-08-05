import React, {useLayoutEffect} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import Layout from "../layout";
import NoSidebar from "../layout/noSidebar";
import PrivateRoute from "./protectedRoute";
import Dashboard from "../pages/dashboard";
import Login from "../pages/auth/login";
import Logout from "../pages/auth/logout";
import Error404 from "../pages/error/Error-404";
import ForgotPassword from "../pages/auth/forgot-password";
import ResetPassword from "../pages/auth/reset-password";
import Ladder from "../pages/master/ladder";
import Level from "../pages/master/level";
import Major from "../pages/master/major";
import Year from "../pages/master/year";
import Institution from "../pages/institution";
import {List as ListStudent, Add as AddStudent, View as ViewStudent} from "../pages/student"
import Program from "../pages/institution/program";
import Teacher from "../pages/teacher";
import Rombel from "../pages/institution/rombel";


const Router = () => {
    const location = useLocation();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route path={`${import.meta.env.BASE_URL}`} element={<Layout/>}>
                    <Route index element={<Dashboard/>} />
                    <Route path="/master-data/jenjang" element={<Ladder/>} />
                    <Route path="/master-data/tingkat" element={<Level/>} />
                    <Route path="/master-data/jurusan" element={<Major/>} />
                    <Route path="/master-data/tahun-pelajaran" element={<Year/>} />
                    <Route path="/data-lembaga" element={<Institution/>} />
                    <Route path="/data-lembaga/rombongan-belajar" element={<Rombel/>} />
                    <Route path="/data-lembaga/program" element={<Program/>} />
                    <Route path="/data-siswa" element={<ListStudent/>} />
                    <Route path="/data-siswa/tambah" element={<AddStudent/>} />
                    <Route path="/data-siswa/:id/lihat" element={<ViewStudent/>} />
                    <Route path="/data-guru" element={<Teacher/>} />
                </Route>
            </Route>
            <Route path={`${import.meta.env.BASE_URL}`} element={<NoSidebar/>}>
                {/*<Route path="auth-success" element={<Success />}></Route>*/}
                <Route path="auth/lupa-sandi" element={<ForgotPassword />}></Route>
                <Route path="auth/reset-sandi/:token" element={<ResetPassword />}></Route>
                <Route path="auth/masuk" element={<Login/>}></Route>
                <Route path="auth/keluar" element={<Logout/>}></Route>

                <Route path="errors">
                    <Route path="404" element={<Error404 />}></Route>
                    {/*    <Route path="404-classic" element={<Error404Classic />}></Route>*/}
                    {/*    <Route path="504-modern" element={<Error504Modern />}></Route>*/}
                    {/*    <Route path="504-classic" element={<Error504Classic />}></Route>*/}
                </Route>
                <Route path="*" element={<Error404 />}></Route>

            </Route>
        </Routes>
    )
}

export default Router;