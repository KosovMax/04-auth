const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { Subscription } = require('./../../helpers/constants')
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 8;

const authSchema = new Schema({
    email: {
        type:String,
        required: [true, 'Email required'],
        unique: true,
        validate(value) {
            const re = /\S+@\S+\.\S+/
            return re.test(String(value).toLowerCase())
        }
    },
    password: {
        type:String,
        required: [true, 'Password required'],
    },
    subscription: {
      type: String,
      enum: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
      default: Subscription.FREE
    },
    token: {
        type:String,
        default:null
    },
  }, {versionKey: false, timestamps: true});


authSchema.pre('save', async function (next) {


    if(!this.isModified('password')){
        return next()
    }

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    this.password = await bcrypt.hash(this.password, salt, null)

    next();

})


authSchema.methods.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const Auth = model('auth', authSchema);

module.exports = Auth;