import React, { Component, Fragment, useContext } from 'react';
import { UserContext } from '../Contexts/UserContext.jsx';
import Button from '@material-ui/core/Button';

const Logout = () => {
    
    const context = useContext(UserContext);
    return (
        <Button onClick={context.handleLogout} color='secondary' variant="contained">
            Logout
        </Button>
    );
}

export default Logout;