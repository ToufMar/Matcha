const inputsVerif = (id, str) => {
    if (id === 'password') {
        let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return (reg.test(str));
    } else if (id === 'login') {
        let reg = /^[a-zA-Z0-9_-]{5,15}$/;
        return (reg.test(str));
    } else if (id === 'email') {
        let reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:)*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:)+)\])/;
        return (reg.test(str));
    } else if (id === 'lastName' || id === 'firstName'){
        let reg = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
        return (reg.test(str))
    }
}

export default inputsVerif;