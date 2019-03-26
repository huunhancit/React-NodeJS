import React from 'react'
import { Input, Password, Button } from 'components';
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';
import { ActionCreators } from 'app/actions';
import { bindActionCreators } from 'redux';
import * as ActionTypes from 'app/actions/ActionTypes';
import styles from './styles'



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  login = () => {
    const { username, password } = this.state;
    this.props.login(username, password);
  }


  validateLogin = () => {
    const { username, password } = this.state;
    return username && password;
  }

  componentWillReceiveProps = (nextProps) => {
    switch (nextProps.type) {
      case ActionTypes.LOGIN_SUCCESS:
        localStorage.setItem('token', nextProps.userInfo.token);
        this.props.history.push("/app/user");
        break;
      case ActionTypes.LOGIN_FAIL:
        alert(nextProps.message);
        break;
      default:
        console.log(nextProps.type);
        break;
    }
  }


  render() {
    const { username, password } = this.state;
    const { type } = this.props;
    let formvValid = this.validateLogin();
    return (
      <form style={styles.content}>
        <div className="form-group">
          <label>Username:</label>
          <Input style={"form-control"} value={username} onChange={(username) => this.setState({ username })} placeholder={"Enter username..."} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <Password value={password} style="form-control" onChange={(password) => this.setState({ password })} placeholder="Enter password..." />
        </div>
        <Button style="btn btn-primary btn-block" type={'button'} loading={type === ActionTypes.LOGIN_PENDING} disabled={!formvValid} name="Login" onClick={() => this.login()} />
      </form>
    )
  }
}

function mapStateToProps({ authenReducers }) {
  return {
    type: authenReducers.type,
    message: authenReducers.message,
    userInfo: authenReducers.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
