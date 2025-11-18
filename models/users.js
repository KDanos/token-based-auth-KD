import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},
)

//Capture the 'confirm password' entry as a variable
userSchema
    .virtual('confirmPassword')
    .set(function (passwordValue) {
        this._confirmPassword = passwordValue
    })

//Validate that the password and confirm password match
userSchema
    .pre('validate', function (next) {
        if (this.isModified('password') && this.password !== this._confirmPassword) {
            //invalidate the request
            this.invalidate('confirmPassword', 'Please ensure both passwords match')
        }
        //Run next() when this function is passed, to move to the next middleware 
        // (the function is passed if the password has been modified and matched the confirm password)
        next()
    })

//Hash and save the new password
userSchema
    .pre('save', function (next, passwordValue) {
        if (this.isModified('password')) {
            this.password = bcrypt.hashSync(this.password, 12)
        }
        //Always remember to move on
        next()
    })

const User = mongoose.model('User', userSchema)
export default User