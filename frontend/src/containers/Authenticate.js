import React, { useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom'
import App from './App'
import jwtDecode from 'jwt-decode'

const Authenticate =()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [username, setUserName] = useState('')  
    useEffect(() => {
        let token = localStorage.getItem('token')
        if(token){
            setIsAuthenticated(true)
            let tokenDecode = jwtDecode(token)
            setUserName(tokenDecode.username)
        } else {
            setIsAuthenticated(false)
        }
    }, [])

    if(isAuthenticated === null){
        return <></>
    }

    return (
        // If there's jwt token in localstorage, then direct to App. Else, redirect to login page.
        <Route render={() =>
            !isAuthenticated ? (
            <Redirect to='/'/>
            ) : (
            <App username={username}/>
            )
        }
        />
    );
};

export default Authenticate;
