import React, { Component, Fragment, useContext } from 'react';
import {Connect} from './Connect.jsx';
import Logout from './Logout.jsx';
import Inscription from './Inscription.jsx'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { UserContext } from '../Contexts/UserContext.jsx';



const NavBar = () => {

    const {state, dispatch} = useContext(UserContext)
    console.log(state)
    // const connected = (localStorage['user'] && state)
    return (
        <AppBar position="sticky" style={{ backgroundColor: 'pink', width: '100%' }} elevation={0} top={0}>
            <Toolbar>
            {!state.connected &&        
                <Fragment>
                    <Connect />
                    <Inscription />
                </Fragment>
            }
            {state.connected &&        
                    <Logout />
            }
            </Toolbar>
        </AppBar>)
}

export default NavBar;