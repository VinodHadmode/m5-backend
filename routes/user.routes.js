const express = require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { UserModel } = require("../models/user.model");

const userRouter = express.Router()

userRouter.post("/signup", async (req, res) => {
    const { email, password, confirm_password } = req.body

    try {
        if (password === confirm_password) {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (hash) {
                    const user = new UserModel({ email: email, password: hash })
                    await user.save()
                    res.status(200).json({ msg: "New user created!!" })
                } else {
                    res.status(200).json({ msg: "Wrong Credentials!!" })
                }
            })
        } else {
            res.status(200).json({ msg: "Enter password correctly!!" })
        }
    } catch (error) {
        res.status(400).json({ err: error })
    }
})


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            // const token = jwt.sign({ course: 'br' }, 'masai');
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, 'masai');
                    res.status(200).json({ msg: "Logged in succesfully!!" ,token})
                }else{
                    res.status(400).json({msg:"Wrong Credentials."})
                }
            });
        } else {
            res.status(400).json({ msg: "User not found!!" })
        }

    } catch (error) {

    }
})

module.exports = {
    userRouter
}