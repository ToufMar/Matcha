import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class SnackBarComponent extends Component{
    
    state = {
        open: this.props.open,
    }

    handleClose = () =>{
        this.setState({open: false})
    }

    render(){
        
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={this.props.open}
                message={<span>{this.props.response}</span>}
                onClose={this.handleClose}
                style={{backgroundColor: 'red'}}
                // autoHideDuration={2000}
            />
            
        )        
    }
}

export default SnackBarComponent;