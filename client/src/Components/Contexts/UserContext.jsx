import React, { PureComponent, createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import Jwt from 'jwt-decode'


const UserContext = createContext({ connected: false });

// class UserProvider extends PureComponent {

//     handleLogout = (e) => {
//         this.setState({ connected: false })
//     }

//     handleErrorConnection = () => {
//         this.setState({ errorInfos: { errorStatus: false } })
//     }

//     handleConnect = (e) => {
//         e.preventDefault();
//         let headers = {
//             'Content-Type': 'application/json',
//         }
//         axios.post('http://localhost:8000/api/users/connect', this.state.userInfo, headers)
//             .then((res) => {
//                 if (res.data.status === 200) {
//                     let decoded = Jwt(res.data.token)
//                     this.setState({
//                         connected: true,
//                         password: '',
//                         errorInfos: {
//                             errorStatus: false,
//                         },
//                         errorConnection: false,
//                         token: res.data.token,
//                         userInfo: decoded
//                     })
//                 } else {

//                     this.setState({
//                         connected: false,
//                         errorInfos: {
//                             errorStatus: true,
//                             errorMessage: res.data.response,
//                         },
//                         errorConnection: true,
//                     })
//                 }
//             })
//             .catch((err) => console.log(err))
//     }

//     handleInput = (e) => {
//         const { value, id } = e.target;
//         const userInfo = { ...this.state.userInfo, [id]: value }
//         this.setState({ userInfo: userInfo })
//     }

//     state = {
//         userInfo: {
//             login_email: '',
//             password: '',
//             profilePic: null,
//             token: null
//         },
//         errorInfos: {
//             errorStatus: false,
//             errorMessage: ''
//         },
//         connected: false,
//         errorConnection: false,
//         handleConnect: this.handleConnect,
//         handleInput: this.handleInput,
//         handleLogout: this.handleLogout,
//         handleErrorConnection: this.handleErrorConnection,
//     }

//     render() {
//         const { children } = this.props;

//         return (
//             <UserContext.Provider value={this.state}>
//                 {children}
//             </UserContext.Provider>)
//     }
// }
// const RouterConsumer = UserContext.Consumer;

// const UserContextWrapper = (Component) => {
//     return (props) => {
//         return (
//             <RouterConsumer>
//                 {
//                     value => {
//                         return (
//                             <Component {...props} {...value}/>
//                         )
//                     }
//                 }
//             </RouterConsumer>
//         )
//     }
// }

const initialState = {
    connected: false,
    valid: false,
    userInfo: {},
    error: {
        isError: null,
        connection: '',
        snackBar: false,
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'setInput': {
            delete action.type;
            const { target } = action;
            return {
                ...state,
                userInfo: { ...state.userInfo, [target.id]: target.value }
            }
        }
        case 'connectUser': {
            delete state.userInfo.password
            localStorage['user'] = action.res.token;
            return {
                ...state,
                connected: true,
                error: {...state.error, isError: false, message: ''},
                userInfo: { ...state.userInfo, token: action.res.token }
            }
        }
        case 'errorConnection': {
            console.log(action.res.response)
            return {
                ...state,
                error: {...state.error, isError: true, message: action.res.response, snackBar: true}
                
            }
        }
        case 'closeSnack': {
            return {
                ...state,
                error: {...state.error, snackBar: false}
            }
        }
        case 'logout': {
            return {
                ...state,
                connected: false,
                userInfo: {}
            }
        }
        default:
            return state
    }
}

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleInput = (e) => {
        const { target } = e;
        dispatch({
            type: 'setInput', target: target
        })
    }

    const connectUser = (e, userInfo) => {
        e.preventDefault();
        let headers = {
            'Content-Type': 'application/json',
        }
        axios.post('http://localhost:8000/api/users/connect', userInfo, headers)
        .then((res) => {
            (res.data.status === 200) ? dispatch({type: 'connectUser', res: res.data}) : dispatch({type: 'errorConnection', res: res.data})
        })
        .catch((err) => dispatch({type: 'errorConnection'}))
    }

    return (
        <UserContext.Provider value={{
            state,
            dispatch,
            methods: {
                handleInput: handleInput,
                connectUser: connectUser,
            }
        }}>
            {children}
        </UserContext.Provider>)

}

export {
    UserProvider, UserContext
    // , UserContextWrapper 
};