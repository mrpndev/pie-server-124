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
            password: bcrypt.hashSync(password, 10),
        })
        
        /* 
            JWT
            * Authentication - checking un & pwd for correctness
            * Authorization - checking if client requests have authentication to access resources.
                * done using sessionID
                * sessionID is created on server and sent to client
                * needs to be on both client and server to verify
                * this means no cross resource sharing (difficult)
            * Authorization via JSON Web Token
                * server creates JWT of the data, then signs and serializes it with a secret key. The server only stores the key.
                * server sends JWT back to the browser
                * NO token is stored on the server
                * client sends authorization request with JWT
                * server verfies JWT with its secret key
                * JWT gets deserialized and it has user info
                * This allows us to share resources by only keeping secret key on the servers.
         */

        const token = jwt.sign(
            { id: newUser.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 60 * 60 * 24 }
        )

        res.status(201).json({
            message: "User created",
            user: newUser,
            token
        })

    } catch(err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            res.status(409).json({
                message: `Email already in use.`
            })
        } else {
            res.status(500).json({
                message: `You don' messed up and I don't know where.`,
                error: err
            })
        }
    }
})

/* 
    ! CHALLENGE

    * Create a login route "/login" that takes email and password to login the user.
    * Utilize bcrypt to compare password has to what's in the db
    * Create a new token based on the db user id
    
    ! 15 mins 2:50 PM ET
*/

router.post("/login", async (req, res) => {
    
    let { email, password } = req.body
    try {
        const loginUser = await UserModel.findOne({
            where: { email }
        })

        if (loginUser) {
            let pwdCompare = await bcrypt.compare(password, loginUser.password)

            if (pwdCompare) {
                let token = jwt.sign(
                    { id: loginUser.id },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: 60 * 60 * 24}
                )

                res.status(200).json({
                    message: `User logged in`,
                    user: loginUser,
                    token: token
                })
            }
        } else {
            res.status(401).json({
                messsage: `Incorrect Email or Password`
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: err
        })
    }
})

module.exports = router