import React, { Component, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import inputsVerif from '../../utils/InputsVerifications'
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';

class InscriptionButton extends Component {

    state = {
        open: false,
        isMissing: false,
        disabled: true,
        error: false,
        response: {},
        snackOpen: false,
        userInfo: {
            firstName: '',
            lastName: '',
            login: '',
            email: '',
            password: ''
        },
        errorInputs: {
            firstName: null,
            lastName: null,
            login: null,
            email: null,
            password: null,
        },
    }

    handleClose = () => {
        this.setState({
            open: false,
            disabled: true,
        })
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleInput = (e) => {
        const { id, value } = e.target;

        const errorInputs = { ...this.state.errorInputs, [id]: (inputsVerif(id, value)) ? false : true }
        const userInfo = { ...this.state.userInfo, [id]: value }

        const disabled = (errorInputs.firstName === false
            && errorInputs.lastName === false
            && errorInputs.login === false
            && errorInputs.email === false
            && errorInputs.password === false) ? false : true;

        this.setState({
            userInfo: userInfo,
            disabled: disabled,
            errorInputs: errorInputs,
        })
    }

    handleSubmit = () => {
        let headers = {
            'Content-Type': 'application/json',
        }
        axios.post('http://localhost:8000/api/users/inscription', this.state.userInfo, headers)
            .then(res => {
                this.setState({
                    response: res.data.response,
                    error: (res.data.status === 200) ? false : true,
                    snackOpen: true,
                    open: (res.data.status === 200) ? false : true,
                })
            }
            )
    }

    handleCloseSnack = () => {
        this.setState({ snackOpen: false })
    }

    render() {
        const { open, errorInputs, disabled } = this.state;
        return (
            <Fragment>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                    open={this.state.snackOpen}
                    message={<span>{this.state.response}</span>}
                    onClose={this.handleCloseSnack}
                    autoHideDuration={3000}
                />
                <Button onClick={this.handleOpen} color='secondary' variant="contained" >Inscription</Button>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    fullWidth={true}
                    maxWidth={'md'}
                >
                    <DialogContent>
                        <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>{"INSCRIPTION"}</DialogTitle>
                        <form style={{ display: 'flex', flexDirection: "column" }} onChange={this.handleInput}>
                            <TextField
                                id="lastName"
                                label='Nom'
                                placeholder='Ton nom de famille'
                                margin="normal"
                                variant="outlined"
                                error={errorInputs.lastName}
                                autoFocus
                            />
                            <TextField
                                id="firstName"
                                label='Prenom'
                                placeholder='Ton prenom'
                                margin="normal"
                                variant="outlined"
                                error={errorInputs.firstName}
                            />
                            <TextField
                                id="login"
                                label='Login'
                                placeholder="Ton login d'au moins 5 characteres"
                                margin="normal"
                                variant="outlined"
                                error={errorInputs.login}
                            /><TextField
                                id="email"
                                type="email"
                                label='Email'
                                placeholder='Ton email'
                                margin="normal"
                                variant="outlined"
                                error={errorInputs.email}
                            />
                            <TextField
                                id="password"
                                label='Mot de passe'
                                placeholder="Ton mot de passe d'au moins 8 characteres, une majuscule, une minuscule et un chiffre"
                                margin="normal"
                                variant="outlined"
                                error={errorInputs.password}
                                type="password"
                            />
                            <Button onClick={this.handleSubmit}
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
