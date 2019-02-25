import React, { Component, Fragment, useContext } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { UserProvider, UserContext } from '../Components/Contexts/UserContext.jsx';
import { InfosProvider, InfosContext } from '../Components/Contexts/InfosContext.jsx';
import Navbar from '../Components/Navbar/Navbar.jsx';
import Index from '../Pages/Index.jsx';
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
    const infos = useContext(InfosContext);
    const user = useContext(UserContext);
    return (
        <RouterProviders>
            <Navbar />
            <Switch>
                <Route exact path='/' component={Index} />
                <Route path='/verifyEmail' render={Verify} />
                {/* {
                    user.connected &&
                    <div>TA RACE LA CHIENNE</div>
                } */}
            </Switch>
        </RouterProviders>
    )
}
// const Router = () => {
//     const infos = useContext(InfosContext);
//     const user = useContext(UserContext);
//     return (

//     )
// }

export default Router;
