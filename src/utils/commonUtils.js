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

export const mouseIsInbound = (x, y, boundsObject) =>
  x >= boundsObject.left &&
  x <= boundsObject.right &&
  y >= boundsObject.top &&
  y <= boundsObject.bottom
