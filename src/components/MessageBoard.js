import React, { PropTypes as T } from 'react'
import styles from './styles.module.css'

export class MessageBoard extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      messages: [],
    }
  }

  componentDidMount(){
    fetch('/api/v1/messages')
      .then(response => response.json())
      .then(response => {
        console.log("response: ", response);
        this.setState({
        messages: response.messages
      })})
      .catch(error => console.log('Error: ', error));
  }

  render(){
    return (
      <ul>
        {this.state.messages.map(message => {
          return (
            <li>
              <span className={styles.meta}>{message.username}</span>
              <p className="message">{message.content}</p>
            </li>
          )
        })}
      </ul>
    );
  }
}

export default MessageBoard;
