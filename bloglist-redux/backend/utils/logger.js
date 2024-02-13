/*
const info = (...params) => {
  if(process.env.NODE_ENV !== 'test')
    console.log(...params)
  }
  
const error = (...params) => {
  if(process.env.NODE_ENV !== 'test')
  console.error(...params)
}
*/

const info = (...params) => {
  process.env.NODE_ENV !== 'test'
    ? console.log(...params)
    : console.log("*test mode** ", ...params)
}

const error = (...params) => {
  process.env.NODE_ENV !== 'test'
    ? console.error(...params)
    : console.error("*test mode** ", ...params)
}

  module.exports = {
    info, error
  }