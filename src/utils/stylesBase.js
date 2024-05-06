export const DEFAULT_EM = 30
export const emify = px => `${px / DEFAULT_EM}em`
export const getEm = (em = 1) => parseInt(getComputedStyle(document.body).fontSize) * em
export const getPx = emString => parseFloat(emString.replace(/em$/, '')) * getEm()