/* eslint-disable no-undef */
import Axios from 'axios'
import { API_ENDPOINT } from 'configs/constants'
import { cleanBody, cleanQueryParams } from './function'

const timeout = 60000

const headers = {
  Pragma: 'no-cache', // HTTP 1.0.
  'Cache-Control': 'no-cache, no-store, must-revalidate', // HTTP 1.1.
  'Access-Control-Allow-Origin': '*',
}

const axios = Axios.create({
  baseURL: API_ENDPOINT,
  timeout,
  headers,
})

export const errorInterceptor = ({ response: { data, status } = {}, ...others }) => {
  return Promise.reject({
    data: { ...data, statusCode: status },
    others,
  })
}

export const requestInterceptor = (configs) => {
  if (configs.params) {
    configs.params = cleanQueryParams(configs.params)
  }

  if (configs.data) {
    configs.data = cleanBody(configs.data)
  }

  return configs
}

export const responseInterceptor = ({ data }) => {
  return Promise.resolve(data)
}

axios.interceptors.request.use(requestInterceptor, errorInterceptor)
axios.interceptors.response.use(responseInterceptor, errorInterceptor)
export { axios as default, Axios as axios }
