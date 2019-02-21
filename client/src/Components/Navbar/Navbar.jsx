import React, { Component, Fragment } from 'react';
import Connect from './Connect.jsx';
import Logout from './Logout.jsx';
import Inscription from './Inscription.jsx'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
class NavBar extends Component {

    render() {
        const { connected } = this.props.datas;
        return (
            <AppBar style={{ backgroundColor: 'pink' }}>
                <Toolbar>
                    {!connected &&
                        <Fragment>
                            <Connect />
                            <Inscription/>
                        </Fragment>
                    }
                    {connected &&
                        <Logout />}
                </Toolbar>
            </AppBar>
        )


        // if (!connected) {
        //     return (
        //         <Connect></Connect>
        //     )
        // } else {
        //     return (
        //         <Logout></Logout>
        //     )
        // }
    }
}

export default NavBar;