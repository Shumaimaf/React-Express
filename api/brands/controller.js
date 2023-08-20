const Brand = require('./model');
const { connect } = require('mongoose')
require('dotenv').config()

// ============== Get All Brands ============= //

const getAllBrands = async (req, res) => {
    try {
        await connect(process.env.MONGO_URL);
        console.log("DB Connected");
        const brands = await Brand.find();
        res.status(200).json({
            brands
        });
    } catch (error) {
        res.json({
            message: error.message
        });
    }
}

// ============== Add Brands ============= //

const AddBrand = async (req, res) => {
    const { BrandName, BrandImage } = req.body

    if (!BrandName || !BrandImage) {
        res.json({
            message: "please insert proper values"
        })
    }
    else {
        try {
            await connect(process.env.MONGO_URL)
            console.log("DB Connected")
            await Brand.create({ BrandName, BrandImage })

            const allbrands = await Brand.find()
            res.status(201).json({
                message: "brand created successfully",
                brands: allbrands

            })
        } catch (error) {
            res.json({
                message: error.message
            })

        }

    }
}

//=============Get brand by id==========//

const BrandByID = async (req, res) => {
    const { _id } = req.params;
    try {
        await connect(process.env.MONGO_URL)
        console.log("DB Connected")
        const brand = await Brand.findOne({ _id });
        if (!brand) {
            return res.status(404).json(
                {
                    message: "Brand Not Found",
                })
        }
        res.json({ brand })
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

//=============Get brand by name==========//

const BrandByName = async (req, res) => {
    const { BrandName } = req.params;
    try {
        await connect(process.env.MONGO_URL)
        console.log("DB Connected")
        const brand = await Brand.findOne({ BrandName });
        if (!brand) {
            return res.status(404).json({
                message: 'Brand not found',
            });
        }
        res.json({ brand });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

//=============Update brand==========// 
const updateBrand = async (req, res) => {
    const { _id, BrandName, BrandImage } = req.body;
    const filter = { _id };
    const update = { BrandName, BrandImage };
    try {
        await connect(process.env.MONGO_URL);

        await Brand.findOneAndUpdate(filter, update, {
            new: true,
        });

        const brands = await Brand.find();

        res.json({
            message: "Brand updated successfully",
            brands,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};


//=============Delete brand==========//

const deleteBrand = async (req, res) => {
    const { BrandName } = req.params; // Correctly extract BrandName from req.params
    try {
        await connect(process.env.MONGO_URL);
        console.log("DB Connected");
        await Brand.findOneAndDelete({ BrandName }); // Find and delete by BrandName
        const brands = await Brand.find();

        res.status(200).json({
            message: "Brand deleted successfully",
            brands,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
module.exports = { AddBrand, BrandByID, getAllBrands, BrandByName, updateBrand, deleteBrand }