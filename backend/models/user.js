const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    validate: {
      validator: function(v) {
        // Valid Characters are '1234567890-_.abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        return /^[0-9a-zA-Z_.-]+$/.test(v);
      },
      message: props => `${props.value} is not a valid username - Valid Characters are '1234567890-_.abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' !`
    },
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Customer', 'Vendor']
  }
})

userSchema.plugin(uniqueValidator);

userSchema.pre("save", async function(next) {
  try {
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
    return next();
  } catch (error) {
    return next(error);
  } 
});

userSchema.methods.comparePassword = function(plaintext, callback) {
  // callback takes parameter (error, resultOfCompare)
  bcrypt.compare(plaintext, this.password, function(err, result) {
    return callback(err, result)
  });
}

module.exports = mongoose.model('User', userSchema)
