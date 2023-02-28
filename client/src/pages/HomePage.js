import React from 'react';
import "../style/HomePage.scss";
import Button from '@mui/material/Button';

const HomePage = () => {
    return (
        <div className='home-page'>
            <div className="container">
                <h1 className='home-text'>Ця програма дозволяє вам:</h1>

                <h3 className='added-text'>Cтворювати редагувати та видаляти завдання.</h3>

                <p className='p-text'>Для того щоб могти використовувати її увійдіть або зареєсруйте аккаут</p>

                <div className="buttons">
                    <Button href='/login' className="button" variant="contained">Увійти</Button>
                    <Button href='/registration' className="button" variant="outlined">Зареєсруватися</Button>
                </div>

            </div>
        </div>
    )
}

export default HomePage;