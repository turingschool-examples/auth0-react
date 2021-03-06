import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import PostNewMessage from 'components/PostNewMessage'
import MessageBoard from 'components/MessageBoard'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class Home extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      profile: props.auth.getProfile()
    }
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })
  }

  logout(){
    this.props.auth.logout()
    this.context.router.push('/login');
  }

  render(){
    const { profile } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.userMeta}>
          <p>Logged in as: <span>{profile.name}</span></p>
          <Button onClick={this.logout.bind(this)}>Logout</Button>
        </div>
        <MessageBoard />
        <PostNewMessage auth={this.props.auth}></PostNewMessage>
      </div>
    )
  }
}

export default Home;
