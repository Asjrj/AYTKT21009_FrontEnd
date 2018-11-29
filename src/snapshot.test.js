import React from 'react'
import renderer from 'react-test-renderer'
import { User } from './containers/User'
import store from './store'

describe.only('<User />', () => {

  const theUser = {
    _id: '456',
    id: '456',
    name: 'Kalle Käyttäjä'
  }
  const blog1 = {
    id: '123',
    title: 'Snapshot otsikko',
    author: 'Snapshot kirjoittaja',
    url: 'https://reactpatterns.com/',
    likes: 1,
    user: theUser
  }
  const blog2 = {
    id: '777',
    title: 'Uusi otsikko',
    author: 'Uusi Kirjoittaja',
    url: 'https://jokumuu.com/',
    likes: 2,
    user: theUser
  }
  const blogs = [blog1, blog2]
  const users = [theUser]

  const tree = renderer
    .create(<User store={store}
      userId='456'
      blogs={blogs}
      users={users}
    />)

  test('renders correctly', () => {
    expect(tree.toJSON()).toMatchSnapshot()
  })

})