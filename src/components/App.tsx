import '../styles/components/App.css';
import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import LoginFormPage from "./LoginFormPage";
import UserPage from "./UserPage";


const App: React.FunctionComponent = () => {

    return (
        <Switch>
            <Route path='/user'><UserPage/></Route>
            <Route path='/login'><LoginFormPage/></Route>
            <Redirect from='/' to='/login'/>
        </Switch>
    );
}

export default App;
