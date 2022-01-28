const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Post = require('../models/Post')


// UPDATE
router.put('/:username', async (req, res) => {
    console.log("Update")
    if (req.params.username == req.body.username) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updatedUser = await User.findOneAndUpdate(
                {
                    username: req.params.username
                },
                {
                    $set: req.body
                },
                {
                    new: true,
                }
            );
            const { password, ...others } = updatedUser._doc
            res.status(200).json(others)
        } catch (error) {
            res.status(500).json(error)
        }

    }
    else {
        res.status(401).json("You can update your account only")    // 401: Unauthorized
    }
})


// DELETE
router.delete('/:username', async (req, res) => {
    console.log("Delete");
    if (req.params.username == req.body.username) {
        try {
            const user = await User.findOne({ username: req.body.username })
            try {
                await Post.deleteMany({ username: user.username })
                await User.findOneAndDelete({ username: req.body.username })
                res.status(200).json("User has been deleted")
            } catch (error) {
                res.status(500).json(error)
            }
        } catch (error) {
            res.status(404).json("User not found")
        }
    }
    else {
        res.status(401).json("You can delete your account only")
    }
})

// GET a user
router.get('/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select({ "password": 0 })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router