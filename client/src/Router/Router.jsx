import React, { Component, Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import {UserProvider} from '../Components/Contexts/UserContext.jsx';
import Navbar from '../Components/Navbar/Navbar.jsx';
import Index from '../Pages/Index.jsx';
import Verify from '../Pages/Verify.jsx'

class Router extends Component {
    render() {
        return (
            <UserProvider>
                <Navbar datas={'lol'}/>
                <Switch>
                    <Route exact path='/' component={Index} />
                    <Route path='/verifyEmail' render={Verify} />
                    {/* { */}
                    {/* this.state.connected && */}
                    <div>TA RACE LA CHIENNE</div>
                    {/* } */}
                </Switch>
            </UserProvider>
        )
    }
}

export default Router;
