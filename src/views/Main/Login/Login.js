import React, { PropTypes as T } from 'react'
import AuthService from 'utils/AuthService'

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
      <div>
        <button onClick={auth.login.bind(this)}>Login</button>
      </div>
    )
  }
}

export default Login;
