import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import Authorization from "./pages/Authorization";

export const UseRoutes = (isLogin) => {

    if (isLogin) {
        return (
            <Routes>
                <Route exact path="/" element={<MainPage/>}  />
                <Route exact path="/login" element={<Navigate to="/"  replace={true} />}  />
            </Routes>
        )
    }

    return (
        <div>
            <Routes>
                <Route exact path='/' element={<HomePage/>} />
                <Route exact path='/*' element={
                    <div>
                        <Authorization/>
                    </div>}
                />
            </Routes>
        </div>
    )
}