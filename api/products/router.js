const express = require('express')
const router = express.Router()

const { createProduct, getProductByBrand, productByCategory, updateProduct, deleteProduct, getAllProducts } = require('./controller')

router.post('/create-product', createProduct);
router.get('/get-product-by-brand', getProductByBrand);
router.get('/get-product-by-category', productByCategory);
router.put('/update-product', updateProduct);
router.delete('/delete-product/:ProductName', deleteProduct);
router.get('/get-all-products', getAllProducts);

module.exports = router