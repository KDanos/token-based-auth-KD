import express from 'express'
import User from '../models/users.js'

const router = express.Router()

//Router
router.post('/sign-up', async (req, res) => {

    try {
        // res.send('this is still working Constantino')
        const newUser = await User.create(req.body)
        return res.status (200).json(newUser)
        // await User
        // return res.json({message: 'Hit Sign Up route'})
    } catch (error) {
        console.error('Something went wrong in the auth router.post router')
        console.log(error.message)
        return res.status(400).json(error.message)
    }
})

export default router