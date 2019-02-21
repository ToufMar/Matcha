import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';

class Inscription extends Component{
    
    state ={
        open: false,
    }

    handleClose = () => {
        this.setState({open: false})
    }
    render(){
        const {open} = this.state;

        return(
            <Dialog
                open={open}
                onClose
            >
                
            </Dialog>
        )
    }
}

export default Inscription;