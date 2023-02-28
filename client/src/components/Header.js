import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {AuthContext} from "../context/auth.context";
import {Link} from "@mui/material";
import "../style/Header.scss"

const Header = () =>{

    const { logout, isLogin } = useContext(AuthContext)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" >
                <Toolbar>
                    <Typography textAlign='start' variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        <Link href='/' className={'App-link'}>Блокнот</Link>
                    </Typography>
                    {
                        isLogin
                        ? <Button href='/' color="inherit" onClick={(e)=> {
                            e.preventDefault();
                            logout();
                            }}>Вийти</Button>
                        : <Button href='/login' color="inherit">Увійти</Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;