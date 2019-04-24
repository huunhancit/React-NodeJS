import React from 'react'
import { Login } from 'app/pages'
import { Route } from 'react-router-dom'

class Authen extends React.PureComponent {
  render() {
    return (
      <div>
        <Route exact path="/authen/login" component={Login} />
      </div>
    )
  }
}

export default Authen