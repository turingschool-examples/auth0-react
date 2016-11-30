import React, { PropTypes as T } from 'react'

export class Container extends React.Component {
  static contextTypes = {
    router: T.object
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance to children
      })
    }

    return (
      <div>
        <h1>Super Secret Message Board</h1>
        <div className="wrapper">{children}</div>
      </div>
    )
  }
}

export default Container;
