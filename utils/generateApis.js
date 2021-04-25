const generator = (axios) => (path = '') => (method = '', id = '') => (data = {}, options = {}) => {
  return ['get', 'delete'].includes(method?.toLowerCase())
    ? axios[method](`${path}/${id}`, { params: data, ...options })
    : axios[method](`${path}/${id}`, data, options)
}

export default generator
