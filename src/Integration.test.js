import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      // luo sovellus siten, että käyttäjä ei ole kirjautuneena
      app = mount(<App />)
    })

    it('renders login page to begin with', () => {
      app.update()
      const h2 = app.find('h2')
      //console.log('*** H2', h2.debug())
      expect(h2.text()).toContain('Log in to application')
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      // luo sovellus siten, että käyttäjä on kirjautuneena
      const user = {
        username: 'Kayttaja1',
        token: '1234567890',
        name: 'Käyttäjä1'
      }
      localStorage.setItem('blogUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('all notes are rendered', () => {
      //console.log('*** APP', app.debug())
      app.update()
      const blogComponents = app.find(Blog)
      //console.log('*** blogComponents', blogComponents.debug())
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })

})