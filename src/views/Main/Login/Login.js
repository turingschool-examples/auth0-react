import React, { PropTypes as T } from 'react'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'


export class Login extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props
    return (
      <div className={styles.login}>
        <h2>You must log in to see the message board and post new messages.</h2>
        <button onClick={auth.login.bind(this)}>Login</button>
      </div>
    )
  }
}

export default Login;
