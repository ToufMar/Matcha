import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { RouterProvider } from './RouterContext.jsx';
import Navbar from '../Components/Navbar/Navbar.jsx';
import Index from '../Pages/Index.jsx';
class Router extends Component {
    
    handleConnect = () => {
        this.setState({
            connected: (this.state.connected) ? false : true
        })
    }

    state = {
        connected: false,
        handleConnect: this.handleConnect
    }

    render() {
        console.log(this.state)
        return (
            <RouterProvider value={this.state}>
                <Navbar datas={this.state}></Navbar>
                <Switch>

                {this.state.connected && 
                    <Route exact path='/' component={Index}></Route>
                }
                </Switch>
            </RouterProvider>
        )
    }
}



export default Router;
