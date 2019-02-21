import React, { Component, Fragment } from 'react';
import { RouterContext, RouterConsumer } from '../../Router/RouterContext.jsx';
import Button from '@material-ui/core/Button';

class Logout extends Component {

    render() {
        return (
            <RouterConsumer>
                {() => (
                    <Button onClick={this.context.handleConnect} color='secondary' variant="contained">
                        Logout
                    </Button>
                )
                }
            </RouterConsumer>
        );
    }
}


Logout.contextType = RouterContext;
export default Logout;