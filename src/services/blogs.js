import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (newBlog, token) => {
  const response = await axios.post(baseUrl, newBlog, { headers: { Authorization: "Bearer " + token } })
  return response.data
}

const likeBlog = async (newBlog, token) => {
  const postUrl = baseUrl + '/' + newBlog.id
  const response = await axios.put(postUrl, newBlog, { headers: { Authorization: "Bearer " + token } })
  return response.data
}

export default { getAll, addBlog, likeBlog }