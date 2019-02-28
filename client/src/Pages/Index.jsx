import React, {Component, Fragment, useContext, useState} from 'react';
import {UserContext} from '../Components/Contexts/UserContext.jsx';

const handleClick = (connected, verified) => {
    if (!connected){
        return (true)
        // window.location.reload()
    } 
}

const FalshUser = ({ connected, id}) => {
    return(
        <>
        LOL
        </>
    )
    
} 

const testConnected = () => {

}

const index = () => {
    const {state, dispatch} = useContext(UserContext);
    return (
        // <p></p>
        <FalshUser connected={state.connected} id={1}></FalshUser>
        )

    
}

export {index};