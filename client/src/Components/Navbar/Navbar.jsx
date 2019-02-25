import React, { Component, Fragment, useContext } from 'react';
import Connect from './Connect.jsx';
import Logout from './Logout.jsx';
import Inscription from './Inscription.jsx'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { UserContext } from '../Contexts/UserContext.jsx';

const NavBar = () => {

    const context = useContext(UserContext)
    console.log(context)
    return (

        <AppBar position="sticky" style={{ backgroundColor: 'pink', width: '100%' }} elevation={0} top={0}>
            <Toolbar>
                <input id='login' onChange={context.handleInput}></input>
                <input id='lul' onChange={context.handleInput}></input>

                {/* {!context.connected &&
                    <Fragment>
                        <Connect />
                        <Inscription />
                    </Fragment>
                }
                {context.connected &&
                    <div style={{ display: 'flex' }}>
                        <p>{context.userInfo.login}</p>
                        <Logout />
                    </div>
                } */}
            </Toolbar>
        </AppBar>)
}

export default NavBar;