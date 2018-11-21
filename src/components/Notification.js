import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {    
    if (this.props.notification === null || this.props.notification === '') {
      return <div></div>
    }
    return (
      <div className={this.props.notificationType}>
        {this.props.notification}
      </div>
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
