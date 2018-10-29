import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {

  const blog = {
    title: 'Blogin otsikko',
    author: 'Kirjoittaja',
    likes: 2
  }

  const blogComponent = shallow(<SimpleBlog blog={blog} />)
  console.log('*** blogComponent:', blogComponent.debug())

  const blogLineDiv = blogComponent.find('.BlogLine')
  console.log('*** blogLineDiv:', blogLineDiv.debug())

  const likesDiv = blogComponent.find('#likesDiv')
  console.log('*** likesDiv:', likesDiv.debug())

  it('title is rendered', () => {
    expect(blogLineDiv.text()).toContain(blog.title)
  })

  it('author is rendered', () => {
    expect(blogLineDiv.text()).toContain(blog.author)
  })

  it('likes is rendered', () => {
    expect(likesDiv.text()).toContain(blog.likes)
  })

})