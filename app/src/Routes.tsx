import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from 'containers/Home';
import { Students } from 'containers/Students';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home />}/>
      <Route exact path="/students" render={() => <Students />}/>
    </Switch>
  );
};