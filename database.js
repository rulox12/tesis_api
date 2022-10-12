const mongoose = require('mongoose')

const startConnection = async () => {
  try {
    const db = await mongoose.connect('mongodb+srv://easypay:EJuxbgsAIZZDfB5r@clustersebastianhenaoea.sfan2.mongodb.net/easypay?retryWrites=true&w=majority')
    console.log(db.connection.name)
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  startConnection,
}
