import React, { PropTypes as T } from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class Messages extends React.Component {
  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      messages: "",
      privateMsg: ""
    }
  }

  componentDidMount(){
    const { auth } = this.props
    // public http request
    fetch('/api/v1/messages')
      .then(response => response.json())
      .then(response => this.setState({
        messages: response.messages
      }))
      .catch(error => console.log('Error: ', error));

    // using auth to send an http request with authorization header
    auth.fetch('/api/private')
      .then(response => this.setState({privateMsg: response.message}))
      .catch(error => this.setState({privateMsg: "" + error}))
  }

  render(){
    return (
      <ListGroup className={styles.root}>
        <ListGroupItem header="Post a New Message">
          {this.state.privateMsg}
        </ListGroupItem>
      </ListGroup>
    )
  }
}

export default Messages;
