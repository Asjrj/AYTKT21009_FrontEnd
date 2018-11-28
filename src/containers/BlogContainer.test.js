import React from 'react'
import { shallow } from 'enzyme'
import { Blog } from './Blog'
import store from '../store'

describe.only('<Blog />', () => {

  const theUser = {
    id: '456',
    name: 'Kalle Käyttäjä'
  }
  const blog1 = {
    id: '123',
    title: 'Blogin otsikko',
    author: 'Kirjoittaja',
    url: 'https://reactpatterns.com/',
    likes: 1,
    user: theUser
  }
  const blog2 = {
    id: '777',
    title: 'Toinen otsikko',
    author: 'Toinen Kirjoittaja',
    url: 'https://reactpatterns.com/',
    likes: 2,
    user: theUser
  }
  const blogs = [blog1, blog2]

  const mockNotify = jest.fn()
  const mockLike = jest.fn()
  const mockDelete = jest.fn()
  const mockComment = jest.fn()

  const wrapper = shallow(<Blog store={store}
    blogId='777'
    blogs={blogs}
    notify={mockNotify}
    likeBlog={mockLike}
    deleteBlog={mockDelete}
    commentBlog={mockComment}
  />)

  //console.log('*** Wrapper', wrapper.debug())
  const h2 = wrapper.find('h2')
  //console.log('*** H2:', h2.debug())
  const detailDiv = wrapper.find('.blogDetail')
  //console.log('*** detailDiv:', detailDiv.debug())

  it('blog title is rendered', () => {
    expect(h2.debug()).toContain('Toinen otsikko')
  })
  it('blog url is rendered', () => {
    expect(detailDiv.debug()).toContain('https://reactpatterns.com/')
  })
  it('added by is rendered', () => {
    expect(detailDiv.debug()).toContain('Kalle Käyttäjä')
  })

})