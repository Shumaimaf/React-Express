const Mailgen = require('mailgen');
const Orders = require('./model');
const { connect } = require("mongoose");
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

const mail = async (req, res) => {
    const { email, customerName } = req.body


    if (!email || !customerName) {
        res.status(403).json({ message: 'please give your email' })
    }


    else {
        const config = {
            service: 'gmail',
            auth: {
                user: 'shumaimaf@gmail.com',
                pass: 'qknqexbtvunwxttk'
            }
        }
        const transporter = nodemailer.createTransport(config);

        var mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                // Appears in header & footer of e-mails
                name: 'React Vibe',
                link: 'https://mailgen.js/'

            }
        });

        var mailGenEmail = {
            body: {
                name: customerName,
                intro: 'Welcome to ReactVibe',
                table: {
                    data: [
                        {
                            name: customerName,
                            email: email,
                            token: '1234567'
                        }
                    ]
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };

        const response = {
            from: process.env.NODEMAILER_EMAIL, // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: mailGenerator.generate(mailGenEmail), // html body
        }

        try {
            await transporter.sendMail(response);

            res.json({ message: 'check your email' })
        }

        catch (error) {
            res.status(500).json({
                error
            })
        }
    }
}

// Controller for placing an order
const placeOrder = async (req, res) => {
    const { customerName, customerEmail, customerContact, customerAddress, orderItems } = req.body;

    if (!customerName || !customerEmail || !customerContact || !customerAddress || !orderItems) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }

    const config = {
        service: 'gmail',
        auth: {
            user: 'shumaimaf@gmail.com',
            pass: 'qknqexbtvunwxttk',
        },
    };
    
    const transporter = nodemailer.createTransport(config);
    
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'React Vibe',
            link: 'https://mailgen.js/',
        },
    });

    // Calculate total bill
    const totalBill = orderItems.reduce((total, item) => total + item.price, 0);
    
    const mailGenEmail = {
        body: {
            name: customerName,
            intro: 'Thank you for your order!',
            table: {
                data: [
                    {
                        customerName,
                        customerEmail,
                        customerAddress,
                        customerContact,
                        orderItems: orderItems.map(item => item.name).join(', '), // Convert array to string
                        totalBill: `$${totalBill.toFixed(2)}`,
                    },
                ],
            },
            outro: 'We appreciate your business. If you have any questions, please contact us.',
        },
    };

    const response = {
        from: process.env.NODEMAILER_EMAIL,
        to: customerEmail,
        subject: 'Order Confirmation',
        text: 'Thank you for your order!',
        html: mailGenerator.generate(mailGenEmail),
    };
    
    try {
        await Orders.create({
            customerName,
            customerEmail,
            customerContact,
            customerAddress,
            orderItems,
        });
    
        await transporter.sendMail(response);
    
        res.status(200).json({ message: 'Order placed successfully. Check your email for confirmation.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while processing the order.' });
    }
};



module.exports = { mail , placeOrder }