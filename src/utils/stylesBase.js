export const getRem = (rem = 1) =>
  parseInt(getComputedStyle(document.documentElement).fontSize) * rem
export const getFontSize = (em = 1) => parseInt(getComputedStyle(document.body).fontSize) * em

export const getPx = remString => parseFloat(remString.replace(/rem$/, '')) * getRem()
export const remify = px => `${px / 16}rem`