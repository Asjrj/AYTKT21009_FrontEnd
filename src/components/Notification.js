import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'


class Notification extends React.Component {
  render() {
    if (this.props.notification === null || this.props.notification === '') {
      return <div></div>
    }
    let style= this.props.notificationType !== 'error' ? 'info': 'danger'
    return (
      <Alert bsStyle={style}>
        {this.props.notification}
      </Alert>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.message,
    notificationType: state.notification.type
  }
}

export default connect(mapStateToProps)(Notification)
