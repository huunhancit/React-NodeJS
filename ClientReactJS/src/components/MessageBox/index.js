import React from 'react'
import styles from './styles'


class MessageBox extends React.PureComponent {

  setContainer = (el) => {
    this.messagesEnd = el;
  }

  scrollToBottom = () => {
    const scrollHeight = this.messagesEnd.scrollHeight;
    const height = this.messagesEnd.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  componentDidMount = () => {
    this.scrollToBottom();
  }

  componentDidUpdate = () => {
    this.scrollToBottom();
  }

  render() {
    const { messages, userCurrent } = this.props;
    return (
      <div style={styles.container} ref={this.setContainer}>
        {
          messages && messages.length > 0 &&
          messages.map((item, index) => {
            return (
              <div key={index} >
                <span style={styles.user}>{userCurrent._id === item.from ? "Me" : item.fromUsername}: </span>{item.message}
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default MessageBox;