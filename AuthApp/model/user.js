const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { query } = require("express");


const UserSchema = mongoose.Schema({
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  isDriver:{
    type: Boolean,
    required: true
  },
  tokens:[{
    token: {
        type: String,
        required: true
    }
}]
});
//query.prototype.select('+fName')

// UserSchema.virtual('patientList',{
//   ref: 'PersonalPatientList',
//   localField: '_id',
//   foreignField: 'doctor'
// })

UserSchema.methods.generateAuthToken = async function (){
  const user = this
  const token = jwt.sign({_id: user._id.toString()},'randomstring')

  user.tokens = user.tokens.concat({token})
  await user.save()

  return token

}

UserSchema.methods.findByCredentials = async function (user,password){
  const isMatch = await bcrypt.compare(password,user.password)
  return isMatch
}

UserSchema.pre('save', async function(next){
  const user = this
  if (user.isModified('password')){
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(user.password,salt)
  }
  next()
})

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
