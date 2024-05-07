export const validateString = (validatorOrString, string) => {
  if (!string) return validatorOrString || ''
  return validatorOrString ? string : ''
}

export const loopObject = (object, callback) => {
  Object.keys(object).forEach(key => {
    const value = object[key]
    callback(key, value, object)
  })
  return object
}

export const quickArray = (length, callback = i => i) => Array(length).fill(0).map((_, i) => callback(i))

export const roundTo = (number, lower, upper) =>
  delta(number, lower) <= delta(number, upper) ? lower : upper

export const delta = (a, b) => Math.abs(a - b)
export const closestIndex = (array, number) => {
  const i = array.findIndex(bound => bound > number)
  return i === -1 ? array.length - 1 :
    delta(number, array[i - 1]) < delta(number, array[i]) ? i - 1 : i
}

export const closest = (array, number) => array[closestIndex(array, number)]

export const mod = (number, upper) => (upper + number % upper) % upper

