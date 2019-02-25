// import React, { Component } from 'react';
import axios from 'axios';

const verify = () => {
    let link = window.location.href.replace('3000', '8000/api/users');
    console.log(link)
    axios.get(link)
        .then(res => {
            const { response, status } = res.data
            if (status === 200) {
                window.location.href = '/'
            }
            else {
                window.location.href = '/error/inscription'
            }
        })
        .catch(err => console.log(err))
    return null
    // axios.post()
}

export default verify;