import React from 'react'
import styles from './styles'
import { InputChat, Users, MessageBox } from 'components'
import { connect } from 'react-redux'
import { ActionCreators } from 'app/actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from 'app/actions/ActionTypes'
import socketIOClient from "socket.io-client"
import { Config } from 'app/common'
import { ToastsContainer, ToastsStore } from 'react-toasts'


class Chat extends React.PureComponent {

  state = {
    userSelected: 0,
    messages: []
  }
  socket = null;

  sendMessage = (msg) => {
    if (this.socket) {
      const { userInfo, users } = this.props;
      const { userSelected } = this.state;
      let userChats = users.filter((item) => item._id !== userInfo.userInfo._id);
      var msgObject = {
        message: msg,
        from: userInfo.userInfo._id,
        fromUsername: userInfo.userInfo.username,
        to: userChats[userSelected]._id,
        toUsername: userChats[userSelected].username,
      }
      this.socket.emit('chat', msgObject);
      let messages = [...this.state.messages, msgObject];
      this.setState({ messages })
    } else {
      ToastsStore.error('Can\'t connect to server ');
    }
  }

  _getUserSelected = () => {
    const { userInfo, users } = this.props;
    const { userSelected } = this.state;
    let userChats = users.filter((item) => item._id !== userInfo.userInfo._id);
    return userChats[userSelected];
  }

  selectUser = (selected) => {
    const { userSelected } = this.state
    if (userSelected === selected) {
      return;
    }
    this.setState({ userSelected: selected, messages: [] }, () => {
      const { userInfo } = this.props;
      let chatWith = this._getUserSelected();
      let to = chatWith._id;
      let from = userInfo.userInfo._id;
      this.props.getMessages(to, from);
      this.props.newMessage(chatWith, false);
    })
  }

  _getUserById = (id) => {
    const { users } = this.props;
    let user = users.filter((item) => item._id === id);
    return user;
  }

  componentDidMount = () => {
    const { userInfo } = this.props;
    this.socket = socketIOClient(Config.DOMAIN_API);
    this.socket.on(userInfo.userInfo._id, (message) => {
      let chatWith = this._getUserSelected();
      if (message.from === chatWith._id) {
        let messages = [...this.state.messages, message];
        this.setState({ messages });
      } else {
        let userFound = this._getUserById(message.from);
        let u = userFound && userFound.length > 0 ? userFound[0] : { _id: "-1" };
        this.props.newMessage(u, true);
      }
    });
    let chatWith = this._getUserSelected();
    let to = chatWith._id;
    let from = userInfo.userInfo._id;
    this.props.getMessages(to, from);
  }

  componentWillUnmount = () => {
    if (this.socket) {
      this.socket.close();
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.typeMessage === ActionTypes.GET_MESSAGE_SUCCESS) {
      this.setState({ messages: nextProps.messages });
    }
  }

  render() {
    const { userSelected, messages } = this.state
    const { users, userInfo } = this.props
    let userChats = users.filter((item) => item._id !== userInfo.userInfo._id);
    return (
      <div className="row">
        <div className="col-md-4">
          <label style={styles.lbUser}>List users: </label>
          <Users items={userChats} selected={userSelected} onSelect={this.selectUser} />
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-12">
              <label style={styles.lbUser}>Chat with: {userChats[userSelected].username} </label><br />
              <MessageBox messages={messages} userCurrent={userInfo.userInfo} />
            </div>
          </div>
          <InputChat onSend={this.sendMessage} />
        </div>
        <ToastsContainer store={ToastsStore} />
      </div>
    )
  }
}


Chat.defaultProps = {
  users: [],
  messages: []
}

function mapStateToProps({ usersReducers, authenReducers, messageReducers }) {
  return {
    type: usersReducers.type,
    message: usersReducers.message,
    users: usersReducers.users,
    userInfo: authenReducers.userInfo,
    messages: messageReducers.messages,
    typeMessage: messageReducers.type,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)