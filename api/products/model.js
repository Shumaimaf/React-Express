const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        ProductName: {
            type: String,
            unique: true,
            required: true
        },
        ProductImage: {
            type: String,
            required: true
        }
    }
)

const Product = model('Product', productSchema);
module.exports = Product;
