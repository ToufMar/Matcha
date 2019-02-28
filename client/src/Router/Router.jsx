import React, { Component, Fragment, useContext } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { UserProvider, UserContext } from '../Components/Contexts/UserContext.jsx';
import { InfosProvider, InfosContext } from '../Components/Contexts/InfosContext.jsx';
import Navbar from '../Components/Navbar/Navbar.jsx';
import {index} from '../Pages/Index.jsx';
import Verify from '../Pages/Verify.jsx'

const RouterProviders = ({ children }) => {
    return (
        <InfosProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </InfosProvider>
    )
}

const Router = () => {
    return (
        <RouterProviders>
            <Navbar />
            <Switch>
                <Route exact path='/' component={index} />
                {!localStorage && 
                    <Fragment>
                        <Route path='/verifyEmail' render={Verify} />
                    </Fragment>
                }
                {localStorage && 
                    <Fragment>
                        <Route exact path='/' render={index} />
                        <Route path='/verifyEmail' render={Verify} />
                    </Fragment>
                }
            </Switch>

        </RouterProviders>
    )
}
export default Router;
