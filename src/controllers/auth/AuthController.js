const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const signIn = async (req, res) => {
  try {
    const params = req.body
    if (params.email && params.password) {
      const userFound = await User.findOne({ email: req.body.email }).populate('commerces')

      if (!userFound) return res.status(404).json({ message: 'Usuario no encontrado' })

      const matchPassword = req.body.password === userFound.password

      if (!matchPassword) {
        return res.status(401).json({
          token: null,
          message: 'Contraseña incorrecta'
        })
      }

      const token = jwt.sign({ id: userFound._id, cc: userFound.id }, '123456789', {
        expiresIn: 86400
      })

      userFound.password = ''

      res.status(200).json({ user: userFound, token })
    } else {
      res.status(400).json({ message: 'Envia todos los datos necesarios' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error no controlado' })
  }

}

module.exports = {
  signIn
}
