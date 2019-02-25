import React, { PureComponent, Children, createContext } from 'react';
import axios from 'axios';

const UserContext = createContext();
class UserProvider extends PureComponent {

    handleConnect = () => {

        let headers = {
            'Content-Type': 'application/json',
        }
        axios.post('http://localhost:8000/api/users/connect', this.state.userInfo, headers)
            .then((res) => {
                if (res.data.status === 200) {
                    this.setState({
                        connected: true
                    })
                }
            })
            .catch((err) => console.log(err))
    }

    handleInput = (e) => {
        const { value, id } = e.target;
        const userInfo = { ...this.state.userInfo, [id]: value }
        this.setState({ userInfo: userInfo })
    }

    state = {
        userInfo: {
            login_email: '',
            password: ''
        },
        connected: false,
        handleConnect: this.handleConnect,
        handleInput: this.handleInput
    }

    render() {

        const { children } = this.props;
        return (
            <UserContext.Provider value={this.state}>
                {children}
            </UserContext.Provider>)
    }
}
const RouterConsumer = UserContext.Consumer;

const UserContextWrapper = (Component) => {
    return (props) => {
        return (
            <RouterConsumer>
                {
                    value => {
                        return (
                            <Component {...props} {...value} />
                        )
                    }
                }
            </RouterConsumer>
        )
    }
}

export { UserProvider, UserContext, UserContextWrapper };