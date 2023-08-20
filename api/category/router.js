const express = require('express')
const router = express.Router()

const { allCategories, categoryById, categoryByName, createCategory, updateCategory, deleteCategory } = require('./controller')

router.get('/getallcategories', allCategories);
router.get('/categoriesbyid/:_id', categoryById);
router.get('/categorybyname/:CategoryName', categoryByName);
router.post('/create-category', createCategory);
router.put('/update-category', updateCategory);
router.delete('/delete-category/:CategoryName', deleteCategory);


module.exports = router