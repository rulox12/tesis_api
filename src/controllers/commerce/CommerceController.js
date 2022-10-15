const Commerce = require('../../models/Commerce')
const fs = require('fs')
const path = require('path')
const CommerceM = require('../../models/Commerce')

const createCommerce = async (req, res) => {
    const { name, description, nit, color } = req.body
    let logo = req.files?.logo?.path

    if (logo && name && description && nit && color) {
        logo = encodeImageName(logo)
        const commerce = new Commerce({ name, description, nit, logo, color, active: true })
        const savedCommerce = await commerce.save()
        return res.status(200).json({ message: 'Comercio guardado exitosamente', commerce: savedCommerce })
    } else {
        return res.status(404).json({ message: 'Faltan campos' })
    }
}

const updateCommerce = async (req, res) => {
    CommerceM.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, commerce) => {
        if (err) {
            return res.status(500).send({ message: 'Error al Obtener comercio' })
        }
        if (commerce) {
            res.send(commerce)
        } else {
            return res.status(500).send({ message: 'No se encontro el comercio' })
        }
    })
}

const getCommerceByNit = async (req, res) => {
    try {
        if (!req.params.nitCommerce) {
            return res.status(202).send({ message: 'Faltan datos' })
        }

        CommerceM.findOne({ nit: req.params.nitCommerce }).exec((err, commerce) => {
            if (err) {
                return res.status(500).send({ message: 'Ocurrio un error' })
            }

            if (!commerce) {
                return res.status(404).send({ message: 'No existen comercios con ese nit' })
            }

            return res.status(200).send(commerce)
        })
    } catch (error) {
        return res.status(500).send({ message: 'Ocurrio un error' })
    }
}

const getCommerce = async (req, res) => {
    if (!req.params.id) {
        return res.status(202).send({ message: 'Faltan datos' })
    }
    CommerceM.findById(req.params.id).exec((err, commerce) => {
        if (err) {
            return res.status(500).send({ message: 'Ocurrio un error' })
        }

        if (!commerce) {
            return res.status(404).send({ message: 'No existen comercio' })
        }

        return res.status(200).send(commerce)
    })
}

const getAllCommerces = (req, res) => {
    if (res.user) {
        const filter = res.user.isAdmin ? {} : { _id: res.user.commerces }
        console.log(filter)
        CommerceM.find(filter).exec((err, commerces) => {
            if (err) {
                return res.status(500).send({ message: 'Ocurrio un error' })
            }

            if (!commerces) {
                return res.status(404).send({ message: 'No existen tareas' })
            }

            return res.status(200).send(commerces)
        })
    } else {
        return res.status(400).send({ message: 'No tienes permisos para ver los commercios' })
    }
}

const getImage = (req, res) => {
    const imageFile = decodeImageName(req.params.image)
    fs.exists(imageFile, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(imageFile))
        } else {
            res.status(404).send({ message: 'La imagen no existe' })
        }
    })
}

function encodeImageName(name) {
    let buff = new Buffer(name)
    return buff.toString('base64')
}

function decodeImageName(name) {
    let buff = new Buffer(name, 'base64')
    return buff.toString('ascii')
}

module.exports = {
    createCommerce,
    getCommerceByNit,
    getCommerce,
    getAllCommerces,
    getImage,
    updateCommerce
}
