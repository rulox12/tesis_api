const User = require('../../models/User')

const signUp = async (req, res) => {
  const {
    name,
    surname,
    documentType,
    document,
    email,
    password,
    active,
    isAdmin,
    commerce,
    phone,
    createdOnWeb
  } = req.body
  if (name && surname && email && password && active !== null && isAdmin !== null && phone && documentType && document) {
    User.findOne({ email: email }).exec(async (err, response) => {
      if (err) return res.status(404).send({ message: 'Ocurrio un error al registrar el usuario' })
      if (response) return res.status(404).send({ message: 'Ya existe el usuario' })

      const user = new User({
        name,
        surname,
        email,
        documentType,
        document,
        password,
        active,
        phone,
        isAdmin,
        createdOnWeb
      })
      user.commerces = commerce

      const savedUser = await user.save()

      return res.status(200).json({ user: savedUser })
    })
  } else {
    return res.status(404).json({ message: 'Faltan algunos campos necesarios' })
  }
}

const getAllUsers = async (req, res) => {
  User.find({}).populate('commerces').exec((err, users) => {
    if (err) {
      return res.status(500).send({ message: 'Error al Obtener los usuarios' })
    }
    res.send(users.reverse())
  })
}

const getUser = async (req, res) => {
  if (req.params.email) {
    User.findOne({ email: req.params.email }).exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: 'Error al Obtener usuario' })
      }
      if (user) {
        res.send(user)
      } else {
        return res.status(500).send({ message: 'No se encontro el usuario' })
      }
    })
  } else {
    return res.status(404).send({ message: 'Envia todos los campos necesarios' })
  }
}

const updateUser = async (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, user) => {
    console.log(err)
    if (err) {
      return res.status(500).send({ message: 'Error al Obtener usuario' })
    }
    if (user) {
      res.send(user)
    } else {
      return res.status(500).send({ message: 'No se encontro el usuario' })
    }
  })
}

const updateUserPassword = async (req, res) => {
  const password = req.body.password
  const newPassword = req.body.newPassword
  User.findById(req.params.id).exec(async (err, user) => {
    if (err) {
      return res.status(500).send({ message: 'Error al Obtener usuario' })
    }
    if (user) {
      if (user.password === password) {
        user.password = newPassword
        await user.save()
        res.send({
          status: true,
          message: 'Actualizacion realizada con exito'
        })
      } else {
        res.send({
          status: false,
          message: 'No se pudo actualizar la contraseña'
        })
      }
    } else {
      return res.status(500).send({ message: 'No se encontro el usuario' })
    }
  })
}

module.exports = {
  signUp,
  getAllUsers,
  getUser,
  updateUser,
  updateUserPassword
}
