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
        firstName: '',
        lastName: '',
        login: '',
        email: '',
        password: '',
        isMissing: false,
        disabled: true,
        errorInputs: {
            firstName: null,
            lastName: null,
            login: null,
            email: false,
            password: false,
        },
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    verifInputs = (id, value) => {
        if (id === 'lastName' || id === 'firstName' || id === 'login') {
            if (value.length < 8) {
                return true
            } else return false
        }
    }
    
    handleInput = (e) => {
        const { id, value } = e.target;
        const { firstName, lastName, login, email, password } = this.state.errorInputs;
        (firstName && lastName && login) ? console.log(firstName, lastName, login) : console.log(firstName, lastName, login);
        this.setState({
            disabled: (firstName && lastName && login) ? true : false,
            [id]: value,
            errorInputs: {...this.state.errorInputs, [id]: this.verifInputs(id, value)},
        })
    }

    handleSubmit = () => {
        const { firstName, lastName, login, email, password } = this.state;
        if (!firstName || !lastName || !login || !email || !password) {

        }
    }

    render() {
        const { open, errorInputs, disabled } = this.state;
        console.log(disabled)

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
                                id="lastName"
                                label='Nom'
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleInput}
                                error={errorInputs.lastName}
                                />
                            <TextField
                                id="firstName"
                                label='Prenom'
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleInput}
                                error={errorInputs.firstName}
                                />
                            <TextField
                                id="login"
                                label='Login'
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleInput}
                                error={errorInputs.login}
                                /><TextField
                                id="email"
                                label='Email'
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleInput}
                                error={errorInputs.email}
                                />
                            <TextField
                                id="password"
                                label='Password'
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleInput}
                                error={errorInputs.password}
                            />
                            <Button onClick={this.handleSubmit}
                            disabled={disabled}
                            >
                                Submit
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

export default InscriptionButton;