import React, { Component, Fragment, useContext } from 'react';
import { UserContext } from '../Contexts/UserContext.jsx';
import Button from '@material-ui/core/Button';

const Logout = () => {
    
    const {dispatch} = useContext(UserContext);
    return (
        <Button onClick={() => {
                    dispatch({type: 'logout'})
                    localStorage.removeItem('user')
                }} 
                color='secondary' variant="contained">
            Logout
        </Button>
    );
}

export default Logout;