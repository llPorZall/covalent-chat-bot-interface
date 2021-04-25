import ApiProvider from './provider'

export default (() => ({
  getPortfolios(id) {
    return ApiProvider.webs('get', 'portfolios')({ id })
  },
  transactions(params) {
    return ApiProvider.webs('get', 'transactions')(params)
  },
}))()
