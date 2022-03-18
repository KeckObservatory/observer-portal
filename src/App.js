import './App.css';
import Dashboard from './Dashboard';
import {check_authentication} from './Utils'
import React, { useState, useEffect } from 'react'


function App() {
    const [user_info, set_userinfo] = useState({});
    const [isloaded, set_isloaded] = useState(false)

    useEffect(() => {
        if (!isloaded) {
            check_authentication({set_userinfo}, {set_isloaded})
        }}, [isloaded])
    return (
        <div className="App">
            {!isloaded && <h1> page is loading...</h1>}
            {Object.keys(user_info).length > 0 && <Dashboard userinfo={user_info}/>}
        </div>
        )
}

export default App;
