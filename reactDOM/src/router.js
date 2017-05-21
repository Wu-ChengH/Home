import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Users from './routes/Users';
import Inbox from './routes/Inbox';
import Chart from './routes/Chart';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}>
        <IndexRoute component={Inbox} />
        <Route path="/Inbox" component={Inbox} />
        <Route path="/users" component={Users} />
        <Route path="/Chart" component={Chart} />
      </Route>
    </Router>
  );
}

export default RouterConfig;