import React, { Component, Fragment, useContext } from 'react';
import Connect from './Connect.jsx';
import Logout from './Logout.jsx';
import Inscription from './Inscription.jsx'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { UserContextWrapper } from '../Contexts/UserContext.jsx';

const NavBar = (value) => {
    console.log(value)
    return (
        <AppBar position="sticky" style={{ backgroundColor: 'pink', width: '100%' }} elevation={0} top={0}>
            <Toolbar>
                {/* {!connected && */}
                <Fragment>
                    <Connect test={'lol'}/>
                    <Inscription />
                </Fragment>
                {/* } */}
                {/* {connected && */}
                <Logout />
                {/* } */}
            </Toolbar>
        </AppBar>)
}

export default UserContextWrapper(NavBar);