import React, { Component, Fragment } from 'react';
import { UserContext, UserContextWrapper } from '../Contexts/UserContext';
import Button from '@material-ui/core/Button';
import { Dialog, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import axios from 'axios';

class Connect extends Component {
    state = {
        open: false,
        userInfo: {
            login_email: '',
            password: ''
        }
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleInput = (e) => {
        const { value, id } = e.target;
        const userInfo = { ...this.state.userInfo, [id]: value }
        this.setState({ userInfo: userInfo })
    }

    render() {
        const { open } = this.state;
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
                        <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>{"CONNECTION"}</DialogTitle>
                        <form style={{ display: 'flex', flexDirection: "column", alignItems: "center" }} onChange={this.context.handleInput}>
                            <TextField
                                id="login"
                                label="Login/Email"
                                placeholder="Ton Login/E-mail"
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="password"
                                label="Mot de Passe"
                                placeholder="Ton Mot de Passe"
                                margin="normal"
                                variant="outlined"
                                type="password"
                            />
                            <a href="#" style={{ textDecoration: 'none' }}>Reinit Password</a>
                            <Button
                                onClick={e => this.context.handleConnect(e)}
                                color='secondary'
                                variant="contained"
                            >
                                Connection
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>

        );
    }
}

Connect.contextType = UserContext;
export default UserContextWrapper(Connect);