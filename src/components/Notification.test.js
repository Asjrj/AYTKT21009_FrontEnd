import React from 'react'
import { shallow } from 'enzyme'
import { Notification } from './Notification'
import store from '../store'

describe.only('<Notification />', () => {

  const wrapper = shallow(<Notification store={store}
    notification='Test notification'
    notificationType='error'
  />)

  //console.log('*** Wrapper', wrapper.debug())
  const alert = wrapper.find('Alert')
  //console.log('*** ALERT:', alert.debug())

  it('alert exists', () => {
    expect(wrapper.exists('Alert')).toBe(true)
  })
  it('notification is rendered', () => {
    expect(alert.debug()).toContain('Test notification')
  })
  it('notification type is correct', () => {
    expect(alert.debug()).toContain('danger')
  })

})