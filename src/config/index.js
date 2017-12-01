// import path from 'path'
let env = process.env.NODE_ENV || 'production'
env = env.toLocaleLowerCase()

// __dirname 这里打印出来的是根目录，无法理解
// let file = path.resolve(__dirname, env)
console.log(process.cwd())

let config = {}
try {
  config = require('./' + env)
} catch (err) {
  throw err
}

export default {
  ...config,
  timeout: 10000
}
