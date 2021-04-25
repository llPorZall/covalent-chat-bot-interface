import axios from 'utils/axios'
import generateApis from 'utils/generateApis'

const createRequest = generateApis(axios)

export default (() => ({
  webs: createRequest('/web'),
}))()
