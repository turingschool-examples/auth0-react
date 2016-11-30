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
    console.log('mounting');
    // public http request
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
    console.log('rendering', this.state.messages);
    return (
      <ul>
        {this.state.messages.map(message => {
          return (
            <li>
              <span class="meta">{message.username}</span>
              <p class="message">{message.content}</p>
            </li>
          )
        })}
      </ul>
    );
  }
}

export default MessageBoard;
