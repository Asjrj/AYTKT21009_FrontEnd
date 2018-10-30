import React from 'react'
import { shallow, mount } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {

  const blog = {
    id: '123',
    title: 'Blogin otsikko',
    author: 'Kirjoittaja',
    url: 'https://reactpatterns.com/',
    likes: 2,
    user: {
      id: '456',
      name: 'Käyttäjä'
    }
  }
  const mockBlogVisibility = jest.fn()
  const mockLike = jest.fn()
  const mockDelete = jest.fn()
  const user = {
    id: '456',
    name: 'Käyttäjä'
  }
  const blogComponent = shallow(<Blog
    blog={blog}
    showBlogDetails='789'
    setBlogVisibility={mockBlogVisibility}
    likeThisBlog={mockLike}
    deleteThisBlog={mockDelete}
    currentUser={user}
  />)

  const detailDiv = blogComponent.find('.blogDetail')
  console.log('*** detailDiv:', detailDiv.debug())
  const button = blogComponent.find('button')
  console.log('*** button:', button.debug())
  console.log('*** button exists:', blogComponent.exists('button'))

  it('only title and author are visible (no button is rendered)', () => {
    expect(blogComponent.exists('button')).toBe(false);
  })

  const line = blogComponent.find('[id="123"]')

  console.log('*** line:', line.debug())
  line.simulate('click', { preventDefault: {}, target: { id: '123' } })
  console.log('*** Clicked times', mockBlogVisibility.mock.calls.length)
  expect(mockBlogVisibility.mock.calls.length).toBe(1)

  const detailDiv2 = blogComponent.find('.blogDetail')
  console.log('*** detailDiv2:', detailDiv2.debug())

  it('more information is now rendered (url)', () => {
    expect(detailDiv2.text()).toContain(blog.url)
  })

})