import isEmpty from 'lodash/isEmpty'
import reduce from 'lodash/reduce'

const trimValue = (value) => (typeof value === 'string' ? value.trim() : value)

export const cleanQueryParams = (data) =>
  reduce(
    data,
    (result, current, key) => {
      const trimmed = trimValue(current)

      if (['', null, undefined].includes(trimmed)) return result

      if (Array.isArray(trimmed)) {
        if (isEmpty(trimmed)) return result

        return { ...result, [key]: trimmed.toString() }
      }

      return { ...result, [key]: trimmed }
    },
    {}
  )

export const cleanBody = (data) => {
  if (data instanceof FormData) return data
  const cleaned = reduce(
    data,
    (result, current, key) => {
      const trimmed = trimValue(current)

      if (['', null, undefined].includes(trimmed)) return result

      return {
        ...result,
        [key]: trimmed,
      }
    },
    {}
  )

  return cleaned
}

export const hashAddress = (address) => `${address.slice(0, 6)}.....${address.slice(-6)}`
