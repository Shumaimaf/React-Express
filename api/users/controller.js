const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./model')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')


//=========== signup ========//

const SignUp = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB Connected")
        const existingUser = await User.exists({ email: email })
        if (existingUser) {
            res.status(208).json({
                message: "User Already Exists"
            })
        }

        else {
            await User.create({ username, email, password: await hash(password, 12) })
            console.log("User Created")
            res.status(201).json({
                message: "Signup Successfully"
            })
        }
    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
}

const Login = async (req, res) => {

    const { password, email } = req.body;

    try {
        await mongoose.connect(process.env.MONGO_URL)
        const existingUser = await User.findOne({ email: email })

        if (!existingUser) {
            res.status(404).json({
                message: "User not found"
            })
        }

        else {

            const decryptPassword = await compare(password, existingUser.password)
            if (email == existingUser.email && decryptPassword) {
                const token = sign(
                    {
                        id: existingUser._id,
                        username: existingUser.username,
                        email: existingUser.email,
                        profile : existingUser.profile,
                        role : existingUser.role
                    }
                    ,
                    process.env.JWT_SECRET
                )

                res.json({
                    message: "Successfully Loggined",
                    token: token
                })
            }

            else {
                res.json({
                    message: "invalid Credentials"
                })
            }





        }

    }
    catch (error) {
        res.json({
            message: error.message
        })

    }
}

//===========all users ========//

const allUsers = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL)

        const Users = await user.find()
        res.json(
            {
                Users: Users
            }
        )

    }

    catch (error) {
        res.json(
            {
                message: error.message
            }
        )

    }
}

//===========user by email========//

const userbyEmail = async (req, res) => {

    const { email } = req.params


    try {
        await connect(process.env.MONGO_URL)
        const Users = await user.findOne({ email: email })
        res.json(
            {
                Users: Users
            }
        )

    }

    catch (error) {
        res.json(
            {
                message: error.message
            }
        )

    }
}

//===============user by ID=======//

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        await connect(process.env.MONGO_URL);
        const userById = await User.findById(id);

        if (!userById) {
            res.status(404).json({
                message: "User not found",
            });
        } else {
            res.status(200).json({
                User: userById,
            });
        }
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
};

//===============Delete user=======//

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await connect(process.env.MONGO_URL);
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            res.status(404).json({
                message: "user not found"
            })
        }
        else {
            res.status(200).json({
                message: "user deleted successfully",
                User: deletedUser
            })
        }

    } catch (error) {
        res.json({
            message: error.message,
        });
    }

}

//===============update username and profile pic=======//

const updateUser = async (req, res) => {
    const { id } = req.params
    const { username, profilePic } = req.body

    try {
        await connect(process.env.MONGO_URL);

        const userToUpdate = await user.findById(id)

        if (!userToUpdate) {
            res.status(404).json({
                message: "user not found"
            })
        }
        else {
            if (username) {
                userToUpdate.username = username
            }
            if (profilePic) {
                userToUpdate.profilePic = profilePic
            }
        }
        await userToUpdate.save()

        res.status(200).json({
            message: "user updated successfully",
            User: userToUpdate
        })
    } catch (error) {
        res.json({
            message: error.message,
        })
    }
}


module.exports = { SignUp, Login, allUsers, userbyEmail, getUserById, deleteUser, updateUser }