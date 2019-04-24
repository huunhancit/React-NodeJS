import React from 'react'
import styles from './styles'

import { connect } from 'react-redux'
import { ActionCreators } from 'app/actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from 'app/actions/ActionTypes'
import moment from "moment"
import Modal from 'react-responsive-modal'
import { Input, Password, Button } from 'components'
import { ToastsContainer, ToastsStore } from 'react-toasts'

class User extends React.PureComponent {
  state = {
    isShowModal: false,
    username: '',
    password: '',
    email: '',
    isUpdate: false
  }
  userId = null

  componentDidMount = () => {
    this.props.getUsers()
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.type === ActionTypes.GET_USER_FAIL
      || nextProps.type === ActionTypes.UPDATE_MAIL_FAIL
      || nextProps.type === ActionTypes.ADD_USER_FAIL || nextProps.type === ActionTypes.DELETE_USER_FAIL) {
      ToastsStore.error(nextProps.message)
    }
    if (nextProps.type === ActionTypes.UPDATE_MAIL_SUCCESS) {
      this.setState({ isShowModal: false })
      this.props.getUsers()
      ToastsStore.success('Updated email successfully')
    }
    if (nextProps.type === ActionTypes.ADD_USER_SUCCESS) {
      this.setState({ isShowModal: false })
      this.props.getUsers()
      ToastsStore.success('Added user successfully')
    }
    if (nextProps.type === ActionTypes.DELETE_USER_SUCCESS) {
      this.props.getUsers()
      ToastsStore.success('Deleted user successfully')
    }
  }

  save = () => {
    if (this.userId) {
      const { email } = this.state
      this.props.updateEmail(this.userId, email)
    } else {
      const { email, username, password } = this.state
      let data = {
        email,
        username,
        password
      }
      this.props.addUser(data)
    }
  }

  showModal = (user) => {
    if (user) {
      this.userId = user._id
      this.setState({
        email: user.email,
        isUpdate: true,
        isShowModal: true
      })
    } else {
      this.userId = null
      this.setState({
        email: '',
        username: '',
        password: '',
        isUpdate: false,
        isShowModal: true
      })
    }
  }

  deleteUser = (id) => {
    this.props.deleteUser(id);
  }

  render() {
    const { users, type } = this.props
    const { isShowModal, username, password, email, isUpdate } = this.state
    return (
      <div className="row" style={styles.container}>
        <div className="col-md-12 mb-2">
          <button type="button" className="btn btn-primary btn-sm float-right" onClick={() => this.showModal(null)}>Add user</button>
        </div>
        <div className="col-md-12">
          <table className="table table-hover table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Created date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                type === ActionTypes.GET_USER_PENDING &&
                <tr>
                  <td colSpan="5">Loading....</td>
                </tr>
              }
              {
                users.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{moment(item.createdDate).format('d/MM/YYYY')}</td>
                      <td>
                        <button type="button" className="btn btn-success btn-sm" onClick={() => this.showModal(item)}>Edit</button> &nbsp;&nbsp;
                        <button type="button" onClick={() => this.deleteUser(item._id)} className="btn btn-danger btn-sm">Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <Modal open={isShowModal} onClose={() => this.setState({ isShowModal: false })} center closeIconSize={14} >
          <div style={styles.contentModal}>
            <h5 style={styles.headerModal}>User information</h5>
            <hr />
            <div style={styles.bodyModal}>
              <div className="form-group">
                <label>Email address</label>
                <Input className={"form-control"} value={email} onChange={(email) => this.setState({ email })} cusStyle={styles.input} placeholder="Enter email..." />
              </div>
              {
                !isUpdate &&
                <div>
                  <div className="form-group">
                    <label>Username</label>
                    <Input className={"form-control"} value={username} onChange={(username) => this.setState({ username })} cusStyle={styles.input} placeholder="Enter username..." />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <Password className={"form-control"} value={password} onChange={(password) => this.setState({ password })} cusStyle={styles.input} placeholder="Enter password..." />
                  </div>
                </div>
              }
              <Button type={"button"} className={"btn btn-primary float-right"} onClick={this.save} name="   Save   " loading={type === ActionTypes.UPDATE_MAIL_PENDING || type === ActionTypes.ADD_USER_PENDING} />
            </div>
          </div>
        </Modal>
        <ToastsContainer store={ToastsStore} />
      </div>
    )
  }
}

User.defaultProps = {
  users: []
}

function mapStateToProps({ usersReducers }) {
  return {
    type: usersReducers.type,
    message: usersReducers.message,
    users: usersReducers.users
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User)