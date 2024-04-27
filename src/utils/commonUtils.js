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

export const parseCitationInt = string => parseInt(string.replaceAll(/[a-zA-Z]*/g, ''))
export const getHtmlAttrib = attrib => new RegExp(`(?<=${attrib}=")(.*?)(?=")`)
export const stripParagraph = htmlString => (htmlString?.match(/(?<=<p>)(.*?)(?=<\/p>)/) || [])[0]

export const querySelectorArray = (elem, query) => Array.from(elem.querySelectorAll(query))
export const roundTo = (number, lower, upper) => {
  const dLower = Math.abs(number - lower)
  const dUpper = Math.abs(number - upper)
  return dLower <= dUpper ? lower : upper
}