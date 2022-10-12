const app = require('./app')
const { startConnection } = require('./database')

const port = 3000

startConnection().then(r => {
  if (r) console.log('connection success DB')
})

app.listen(process.env.PORT || port)
console.log('Server is running on port: ' + port)
