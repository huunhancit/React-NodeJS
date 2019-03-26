import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Home, Authen } from 'app/pages';
import * as Services from 'app/services';



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Services.isSignIned() === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/authen/login',
        state: { from: props.location }
      }} />
  )} />
)

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => (
             Services.isSignIned() ? (
              <Redirect to="/app/user" />
            ) : (
                <Redirect to="/authen/login" />
              )
          )} />
          <Route path="/authen" component={Authen} />
          <PrivateRoute path="/app" component={Home} />
        </Switch>
      </Router>
    )
  }
}

export default AppRouter


