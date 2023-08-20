const express = require('express')
const router = express.Router()

const { AddBrand, BrandByID, getAllBrands, BrandByName, updateBrand, deleteBrand} = require('./controller')

router.get('/get-all-brands', getAllBrands)
router.post('/addbrand', AddBrand)
router.get('/brandbyid/:_id', BrandByID)
router.get('/brandbyname/:BrandName', BrandByName)
router.put('/update-brand', updateBrand)
router.delete('/delete-brand/:BrandName', deleteBrand)

module.exports = router;