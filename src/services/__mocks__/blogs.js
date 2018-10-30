let token = null

const blogs = [
  {
    id: "5bd6bfe512351a471c7a4ae1",
    title: 'Blogin otsikko',
    author: 'Kirjoittaja',
    url: 'https://reactpatterns.com/',
    likes: 2,
    user: {
      id: "5a437a9e514ab7f168ddf138",
      name: 'Käyttäjä1',
      username: 'Kayttaja1'
    }
  },
  {
    id: "5bd6bfe512351a471c7a4ae2",
    title: "Title changed",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: {
      id: "5a437a9e514ab7f168ddf138",
      name: 'Käyttäjä1',
      username: 'Kayttaja1'
    }
  },
  {
    id: "5bd6bfe512351a471c7a4ae3",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: {
      id: "5a437a9e514ab7f168ddf138",
      name: 'Käyttäjä1',
      username: 'Kayttaja1'
    }
  },
  {
    id: "5bd6bfe512351a471c7a4ae4",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: {
      id: "5a437a9e514ab7f168ddf138",
      name: 'Käyttäjä1',
      username: 'Kayttaja1'
    }
  },
  {
    id: "5bd6bfe512351a471c7a4ae5",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: {
      id: "5a437a9e514ab7f168ddf138",
      name: 'Käyttäjä1',
      username: 'Kayttaja1'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }