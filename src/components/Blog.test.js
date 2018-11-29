import React from 'react'
import { shallow } from 'enzyme'
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

  //console.log('*** blogComponent', blogComponent.debug())
  //const detailDiv = blogComponent.find('.blogList')
  //console.log('*** detailDiv:', detailDiv.debug())
  const comp1 = blogComponent.find('Link')
  //console.log('*** Link:', comp1.debug())
  //console.log('*** Link exists:', blogComponent.exists('Link'))

  it('link to blog details exists', () => {
    expect(blogComponent.exists('Link')).toBe(true)
  })

  it('blog title and author are now rendered', () => {
    expect(comp1.debug()).toContain(blog.title)
    expect(comp1.debug()).toContain(blog.author)
  })

})