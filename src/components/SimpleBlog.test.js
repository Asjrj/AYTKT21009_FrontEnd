import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {

  const blog = {
    title: 'Blogin otsikko',
    author: 'Kirjoittaja',
    likes: 2
  }
  const mockHandler = jest.fn()

  const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
  console.log('*** blogComponent:', blogComponent.debug())
  const blogLineDiv = blogComponent.find('.BlogLine')
  console.log('*** blogLineDiv:', blogLineDiv.debug())
  it('title is rendered', () => {
    expect(blogLineDiv.text()).toContain(blog.title)
  })
  it('author is rendered', () => {
    expect(blogLineDiv.text()).toContain(blog.author)
  })

  const likesDiv = blogComponent.find('#likesDiv')
  console.log('*** likesDiv:', likesDiv.debug())
  it('likes is rendered', () => {
    expect(likesDiv.text()).toContain(blog.likes)
  })

  const button = blogComponent.find('button')
  console.log('*** button', button.debug())
  button.simulate('click')
  button.simulate('click')
  it('like -button is clicked twice', () => {
    expect(mockHandler.mock.calls.length).toBe(2)
  })

})