import React from 'react';
import { NavLink, withRouter } from "react-router-dom"


class Header extends React.PureComponent {


  isActive = (path) => {
    return this.props.location.pathname === path
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Demo Chat</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className={this.isActive('/app/user') ? 'nav-item active' : 'nav-item'} >
              <NavLink to="/app/user" className="nav-link">Users</NavLink>
            </li>
            <li className={this.isActive('/app/chat') ? 'nav-item active' : 'nav-item'} >
              <NavLink to="/app/chat" className="nav-link">Chat</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}






export default withRouter(Header)