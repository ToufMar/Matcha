import React, { Component, Fragment, useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { UserContext } from '../Contexts/UserContext.jsx';
import axios from 'axios';

// class Connect extends Component {
//     state = {
//         open: false,
//         userInfo: {
//             login_email: '',
//             password: ''
//         }
//     }

//     handleClose = () => {
//         this.setState({ open: false })
//     }

//     handleOpen = () => {
//         this.setState({ open: true })
//     }

//     handleInput = (e) => {
//         const { value, id } = e.target;
//         const userInfo = { ...this.state.userInfo, [id]: value }
//         this.setState({ userInfo: userInfo })
//     }

//     render() {
//         const { open } = this.state;

//         return (
//             <Fragment>
//                 <Button onClick={this.handleOpen} color='secondary' variant='contained'>Connection</Button>
//                 <Dialog
//                     open={open}
//                     onClose={this.handleClose}
//                     fullWidth={true}
//                     maxWidth={'md'}

//                 >
//                     <Snackbar
//                         anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
//                         open={this.context.errorInfos.errorStatus}
//                         message={<span>{this.context.errorInfos.errorMessage}</span>}
//                         onClose={this.context.handleErrorConnection}
//                         autoHideDuration={3000}
//                     />

//                     <DialogContent>
//                         <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>{"CONNECTION"}</DialogTitle>
//                         <form
//                             onSubmit={e => this.context.handleConnect(e)}
//                             style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}
//                             onChange={e => this.context.handleInput(e)}
//                             action='/'
//                         >
//                             <TextField
//                                 id="login"
//                                 label="Login/Email"
//                                 placeholder="Ton Login/E-mail"
//                                 margin="normal"
//                                 variant="outlined"
//                             />
//                             <TextField
//                                 id="password"
//                                 label="Mot de Passe"
//                                 placeholder="Ton Mot de Passe"
//                                 margin="normal"
//                                 variant="outlined"
//                                 type="password"
//                             />
//                             <a href="#" style={{ textDecoration: 'none' }}>Reinit Password</a>
//                             <Button
//                                 color='secondary'
//                                 variant="contained"
//                                 type='submit'
//                             >
//                                 Connection
//                             </Button>
//                         </form>
//                     </DialogContent>
//                 </Dialog>
//             </Fragment>

//         );
//     }
// }


const Connect = () => {

    const [openDialog, handleDialog] = useState(false)
    
    const { state, dispatch, methods } = useContext(UserContext)
    // const [openSnackBar, handleSnack] = useState()

    // let openSnackBar = state.error.isError
    console.log()
    return (
        <Fragment>
            <Button onClick={() => handleDialog(value => (value === false) ? true : false)} color='secondary' variant='contained'>Connection</Button>
            <Dialog
                open={openDialog}
                onClose={() => handleDialog(value => (value === false) ? true : false)}
                fullWidth={true}
                maxWidth={'md'}
                >
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                    open={state.error.snackBar}
                    message={<span>{state.error.message}</span>}
                    onClose={()  =>  {
                        dispatch({type:'closeSnack'})
                    }}
                    autoHideDuration={3000}
                    />
                <DialogContent>
                    <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>{"CONNECTION"}</DialogTitle>
                    
                    <form
                        onSubmit={(e) => methods.connectUser(e, state.userInfo, handleDialog(value => (value === false) ? true : false))}
                        style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}
                        onChange={e => methods.handleInput(e)}
                        action='/'
                    >
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
                            color='secondary'
                            variant="contained"
                            type='submit'
                        >
                            Connection
                    </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>

    )
}

export { Connect }

// Connect.contextType = UserContext;
// export default UserContextWrapper(Connect);