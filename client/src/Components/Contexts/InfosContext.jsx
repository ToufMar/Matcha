import React, { PureComponent, createContext, useContext } from 'react';


const InfosContext = createContext({
    isValid: false,
});

class InfosProvider extends PureComponent {

    state = {
        isValid: false
    }

    render() {

        return (
            <InfosContext.Provider value={this.state}>
                {this.props.children}
            </InfosContext.Provider>
        );
    }
}

const getInfosContext = () => {
    let context = useContext(InfosContext)
    console.log(context)
    return (context)
}
        
        
        
export {InfosContext, InfosProvider, getInfosContext };
