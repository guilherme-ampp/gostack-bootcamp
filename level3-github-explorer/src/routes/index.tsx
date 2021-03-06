import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  // if we used a fragment <> </> to encapsulate the <Route> tags - all the matching
  // routes would be shown -> "/" would match both of them!
  // when we use <Switch></Switch> to encapsulate the <Route> tags - it makes
  // sure only one match will show
  // <Switch> cannot be used outside of a Router component
  // so we use <BrowserRouter> around our '<Routes/>' component in the App.tsx file
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/repository/:repository+" component={Repository} />
  </Switch>
);

export default Routes;
