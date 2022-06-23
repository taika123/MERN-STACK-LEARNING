const express = require('express');
const argon2 = require('argon2')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../models/User')

//@route Post api/auth/register
//@desc Register User
//@access Public
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    //simple validation
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "missing username and/or password" })
    }

    try {
        //check for exitsting user
        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({ success: false, message: "username already taken" })
        }
        //all good
        //ma hoa password = argon2
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({ username, password: hashedPassword })
        await newUser.save()

        //return token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)

        res.json({ success: true, message: 'user created successfully', accessToken })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal serve error' })
    }
})

//@route Post api/auth/login
//@desc Login User
//@access Public

router.post('/login', async (req, res) => {

    const { username, password } = req.body

    //simple validation
    if (!username || !password) {
        return res.status(400).json({ success: true, message: 'missing username and/or password' })

    }
    try {
        //check for exitsting user
        const user = await User.findOne({ username })
        if (!user) return res.status(400).json({ success: false, message: 'Incorrect username or password' })
        

        //username found
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid) return res.status(400).json({ success: false, message: 'Incorrect username or password' })

        //all good
        //ma hoa password = argon2
        // const hashedPassword = await argon2.hash(password)
        // const newUser = new User({ username, password: hashedPassword })
        // await newUser.save()

        //return token
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)

        res.json({ success: true, message: 'user logged in successfully', accessToken })
    } catch (error) {
        console.log(error);
            res.status(500).json({ success: false, message: 'Internal serve error' })
    }

})

module.exports = router