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

export default { getAll, addBlog }