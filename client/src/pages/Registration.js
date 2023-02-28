import React, {Fragment} from 'react';
import {FormControl, FormHelperText, Input, InputLabel, Button, Link} from '@mui/material';
import "../style/Authorization.scss"


const Registration = (props) =>{

    function handleChangeEmail(event) {
        props.onChange(event.target.value, 'email');
    }

    function handleChangePassword(event) {
        props.onChange(event.target.value, 'password');
    }


    return (
        <Fragment>
            <h3 className='auth-text'>Реєстрація</h3>
            <form className='form' onSubmit={e => {
                e.preventDefault();
                props.onReg(e);
            }}   >
                <FormControl>
                    <InputLabel htmlFor="email">Електронна адреса</InputLabel>
                    <Input onChange={handleChangeEmail} type='email' name='email' id="email" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">Ваша елктронна адреса - це ваш логін.</FormHelperText>


                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password">Пароль</InputLabel>
                    <Input onChange={handleChangePassword} type='password' name='password' id="password" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">Не розголошуйте свій пароль.</FormHelperText>
                </FormControl>
                <div className="auth-buttons">
                    <Button type='submit' variant="contained">Зареєструватися</Button>
                    <Link href='/login'>Є аккаунт?</Link>
                </div>
            </form>
        </Fragment>

    )
}

export default Registration;