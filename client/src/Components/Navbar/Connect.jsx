import React, { Component, Fragment } from 'react';
import { RouterContext, RouterConsumer } from '../../Router/RouterContext.jsx';
import Button from '@material-ui/core/Button';
import { Dialog, DialogContent, DialogTitle, TextField } from '@material-ui/core';


class Connect extends Component {
    state = {
        open: false,
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    

    render() {
        const {open} = this.state;
        return (
            <Fragment>
                <Button onClick={this.handleOpen} color='secondary' variant='contained'>Connection</Button>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    fullWidth={true}
                    maxWidth={'md'}
                    
                >
                    <DialogContent>
                        <DialogTitle id="alert-dialog-title">{"CONNECTION"}</DialogTitle>
                        <form style={{ display: 'flex', flexDirection: "column", alignItems:"center"}}>
                            <TextField
                                id="Login"
                                placeholder="Login/E-mail"
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="Password"
                                placeholder="Password"
                                margin="normal"
                                variant="outlined"
                            />
                            <a href="#">Reinit Password</a>

                            <RouterConsumer>
                                {() => (
                                    <Button onClick={this.context.handleConnect} variant="contained">
                                        Connection
                                    </Button>
                                )
                                }
                            </RouterConsumer>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>

        );
    }
}
Connect.contextType = RouterContext;
export default Connect;