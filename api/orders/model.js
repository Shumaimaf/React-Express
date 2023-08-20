const { Schema, model } = require('mongoose')

const OrderSchema = new Schema({
    customerName: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
    },
    customerContact: {
        type: String,
        required: true,
    },
    customerAddress: {
        type: String,
        required: true,
    },
    orderItems: [
        {
            type: String, // Change this to the actual type of your order items
            required: true,
        }
    ],
    orderTime: {
        type: Date,
        default: Date.now,
    },
});


const Orders = model('order', OrderSchema)
module.exports = Orders