import React, { Component, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
class InscriptionButton extends Component {
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
        const { open } = this.state;

        return (
            <Fragment>
                <Button onClick={this.handleOpen} color='secondary' variant="contained" >Inscription</Button>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    fullWidth={true}
                    maxWidth={'md'}
                >

                    <DialogContent>
                        <DialogTitle id="alert-dialog-title">{"INSCRIPTION"}</DialogTitle>
                        <form style={{ display: 'flex', flexDirection: "column" }}>
                            <TextField
                                id="LastName"
                                placeholder="Nom"
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="FirstName"
                                placeholder="Prenom"
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="Login"
                                placeholder="Login"
                                margin="normal"
                                variant="outlined"
                            /><TextField
                                id="email"
                                placeholder="Email"
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="Password"
                                placeholder="Password"
                                margin="normal"
                                variant="outlined"
                            />
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

export default InscriptionButton;