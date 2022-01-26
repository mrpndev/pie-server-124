const router = require("express").Router()
const { UserModel } = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {

    const { firstName, lastName, email, password } = req.body

    try {
        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password,
        })

        res.status(201).json({
            message: "User created",
            user: newUser
        })

    } catch(err) {

        console.log(err)
        res.status(500).json({
            error: err
        })
    }
})

module.exports = router