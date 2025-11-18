import express from 'express'

const router = express.Router()

//Router
router.post ('/sign-up', async (req, res) =>{

    try {
        res.send('this is still working Constantino')
        // return res.json({message: 'Hit Sign Up route'})
    } catch (error) {
        console.error ('Something went wrong in the auth router.post router')
    }
    
    
})

export default router