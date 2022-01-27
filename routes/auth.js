const router = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/User')
const email_validator = require('../emailValidator')


// login
router.get('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            res.status(400).json("Wrong credentials")
        }
        else {
            const validatedUser = await bcrypt.compare(user.password, req.body.password)
            if (!validatedUser) {
                res.status(400).json("Wrong credentials")
            }
            else {
                const { password, ...others } = user._doc
                res.status(200).end(others)
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


// register
router.post('/register', async (req, res) => {

    try {
        emailValid = email_validator(await req.body.email)
        if (req.body.password.length < 6) {
            // throw new Error('Minimum password length must be 6')
            res.status(422).end('Minimum password length must be 6')
        }
        else if (!emailValid) {
            // throw new Error('invalid email')
            res.status(422).end("invalid email")
        }
        else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            })

            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = router