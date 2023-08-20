const express = require('express')
const router = express.Router()
const { mail ,placeOrder } = require('./controller')

router.post('/send-mail', mail)
router.post('/place-order', placeOrder)


module.exports = router;