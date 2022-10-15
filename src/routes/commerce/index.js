const express = require('express')
const multipart = require('connect-multiparty')
const commerceController = require('../../controllers/commerce/CommerceController')
const {validateToken} = require('../../middlewares/authenticated')
const router = express.Router()

const mdUpload = multipart({uploadDir: './src/uploads/commerce'})

router.post('/add', [validateToken, mdUpload], commerceController.createCommerce)
router.post('/update-commerce/:id', commerceController.updateCommerce)
router.get('/get-all', validateToken, commerceController.getAllCommerces)
router.get('/:nitCommerce', commerceController.getCommerceByNit)
router.get('/getImage/:image', commerceController.getImage)
router.get('/get-commerce/:id', commerceController.getCommerce)

module.exports = router
