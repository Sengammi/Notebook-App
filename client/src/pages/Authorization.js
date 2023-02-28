import React, {Fragment, useContext, useState} from 'react';
import {Routes, Route} from "react-router-dom";
import Login from "./Login"
import Registration from "./Registration";
import "../style/Authorization.scss"
import axios from "axios";
import {AuthContext} from "../context/auth.context";

const Authorization = () =>{

    const { login } = useContext(AuthContext)

    const [form, setForm] = useState({
        email: '',
        password: '',
    })


    const handleChange = (newValue, nameValue) =>{
        if (nameValue==='email'){
            setForm({
                ...form,
                email: newValue,
            });
        } else {
            setForm({
                ...form,
                password: newValue,
            });
        }
    }

    const registrationHandler = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/registration', {...form}, {
                headers: {'Content-Type': 'application/json'}
            })
                .then(res => console.log(res))
                .then(() => {
                    window.location = '/login';
                })
        } catch (err) {
            console.error(err)
            alert(err.response.data.message)
        }
    }

    const loginHandler = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/login', {...form}, {
                headers: {'Content-Type': 'application/json'}
            })
                .then(res => {
                    login(res.data.token, res.data.userId)
                })
            console.log(234234234234);
        } catch (err) {
            console.error(err)
            alert(err.response.data.message)
        }
    }

    return (
            <Fragment>
                <div className="container">
                    <div className="auth-page">
                        <Routes>
                            <Route exact path='/login' element={<Login value={form} onLog={loginHandler} onChange={handleChange} />}>
                            </Route>
                            <Route exact path='/registration' element={<Registration onReg={registrationHandler} value={form} onChange={handleChange} />}>
                            </Route>
                        </Routes>
                    </div>
                </div>
            </Fragment>
    )
}

export default Authorization;