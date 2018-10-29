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
  const putUrl = baseUrl + '/' + newBlog.id
  const response = await axios.put(putUrl, newBlog, { headers: { Authorization: "Bearer " + token } })
  return response.data
}

const deleteBlog = async (blogId, token) => {
  const delUrl = baseUrl + '/' + blogId
  const response = await axios.delete(delUrl, { headers: { Authorization: "Bearer " + token } })
  return response.data
}

export default { getAll, addBlog, likeBlog, deleteBlog }