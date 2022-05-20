export const toWords = (str) => {
  return str
    .trim()
    .split(' ')
    .filter((word) => word !== '')
}

export const toCheckList = (words, check) => {
  return words.map((word) => (word = { value: word, checked: check }))
}
