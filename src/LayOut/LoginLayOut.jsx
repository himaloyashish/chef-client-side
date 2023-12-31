import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Shared/Footer/NavBar';
import Footer from '../Shared/Footer/Footer';

const LoginLayOut = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default LoginLayOut;