import React from 'react'
import styles from './styles'



class InputChat extends React.PureComponent {
  state = {
    message: '',
  }

  onChangeMessage = (e) => {
    this.setState({ message: e.target.value })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.sendMessage()
    }
  }

  render() {
    const { message } = this.state
    return (
      <div className="row" style={styles.container}>
        <div className="col-md-10">
          <input type="text" className="form-control" onKeyDown={this.handleKeyDown} value={message} onChange={this.onChangeMessage} placeholder="Enter a message..." />
        </div>
        <div className="col-md-2">
          <button type="button" className="btn btn-primary btn-block" onClick={this.sendMessage}>Send</button>
        </div>
      </div>
    )
  }

  sendMessage = () => {
    const { message } = this.state
    if (message) {
      this.props.onSend(message)
      this.setState({ message: '' })
    }
  }
}


export default InputChat