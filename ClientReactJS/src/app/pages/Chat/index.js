import React from 'react'
import styles from './styles'
import { InputChat, Users } from 'components'


class Chat extends React.Component {

  state = {
    userSelected: 0
  }
  users = [
    'Nhan Dinh',
    'Truong Le',
    'Bang Hoang'
  ]

  sendMessage = (msg) => {
    console.log(msg)
  }

  render() {
    const { userSelected } = this.state
    return (
      <div className="row">
        <div className="col-md-4">
          <label style={styles.lbUser}>List users: </label>
          <Users items={this.users} selected={userSelected} onSelect={(userSelected) => this.setState({ userSelected })} />
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-12">
              <label style={styles.lbUser}>Chat with: {this.users[userSelected]} </label><br />
              <textarea className="form-control" rows="10" />
            </div>
          </div>
          <InputChat onSend={(msg) => this.sendMessage(msg)} />
        </div>

      </div>
    )
  }
}


export default Chat