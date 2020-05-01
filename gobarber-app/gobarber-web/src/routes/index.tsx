import React from 'react';
// Switch will guarantee only one route will match at a time
import { Switch, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/signup" component={SignUp} />
        </Switch>
    );
};

export default Routes;
