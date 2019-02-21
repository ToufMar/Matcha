import React, { Component, Fragment } from 'react';
import { RouterContext, RouterConsumer } from '../../Router/RouterContext.jsx';
import Button from '@material-ui/core/Button';


class Connect extends Component {

    render() {
        return (
            <RouterConsumer>
                {() => (
                    // <Fragment>
                        <Button onClick={this.context.handleConnect}  variant="contained">
                            Connect
                        </Button>
                    // </Fragment>
                )
                }
            </RouterConsumer>
        );
    }
}
Connect.contextType = RouterContext;
export default Connect;