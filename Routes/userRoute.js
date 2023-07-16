const express = require("express");
const { userModel } = require("../Models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRouter = express.Router();
require("dotenv").config()


userRouter.post("/register", async (req, res) => {
    const { pass, email, name, age } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.status(400).send(err.message)
            }
            else {
                const user = new userModel({ ...req.body, pass: hash })
                await user.save()
                res.status(200).json({ msg: "User Registered Successfully..." })
            }
        })

    } catch (error) {
        res.status(400).send(error.message)
    }
})

userRouter.post("/login", async (req, res) => {
    const { pass, email } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (user) {
            bcrypt.compare(pass, user.pass, async (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user._id, user: user.name }, process.env.secret)
                    res.status(200).json({ msg: "Login Successfull.....", token: token })
                }
                else {
                    res.status(400).json({ msg: "Wrong Credentials....." })
                }
            })
        }
        else {
            res.status(400).json({ msg: "User Not Found....." })
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = {
    userRouter
}