import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Loadable from 'react-loadable';

import Navbar from '../common/Navbar';
import Loading from '../common/Loading';
import Signature from '../common/Signature';

const AsyncLanding = Loadable({
  loader: () => import('../_landing'),
  loading: Loading,
});

function NoMatch({ location }) {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <section className="app">
        <Navbar />
        <Signature />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <AsyncLanding {...props} />}
          />
          <Route component={NoMatch} />
        </Switch>
      </section>
    </Router>
  );
};

export default hot(App);
