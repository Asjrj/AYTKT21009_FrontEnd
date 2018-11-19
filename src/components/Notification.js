import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const message = this.props.notification
    if (message === null || message === '') {
      return <div></div>
    }
    return (
      <div className={this.props.notificationType}>
        {message}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    notificationType: state.notificationType
  }
}

export default connect(mapStateToProps)(Notification)
