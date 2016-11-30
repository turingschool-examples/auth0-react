import React, { PropTypes as T } from 'react'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class Messages extends React.Component {
  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      messageText: "",
    }
  }

  handleMessageChange(event) {
    this.setState({
      messageText: event.target.value
    });
  }

  sendMessage(event) {
    const { auth } = this.props

    fetch('/api/v1/messages',
      { 
        method: 'POST',
        body: JSON.stringify({ 
          message: {
            content: this.state.messageText,
            username: auth.getProfile().name
          }
        })
      }
    )
    .then(response => auth.checkStatus(response))
    .then(response => window.location.reload())
    .catch(error => console.log('Error submitting new message: ', error));
  }

  render(){
    return (
      <div className={styles.newMessage}>
        <h2>Post a New Message</h2>
        <textarea
          value={this.state.messageText}
          onChange={this.handleMessageChange.bind(this)}
        />
        <input 
          type="submit"
          onClick={this.sendMessage.bind(this)}
          value="Submit"
        />
      </div>
    )
  }
}

export default Messages;
