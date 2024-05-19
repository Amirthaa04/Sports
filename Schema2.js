const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Register = mongoose.model('Register', RegisterSchema);

module.exports = Register;


// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const RegisterSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// // Hash password before saving
// RegisterSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Method to compare password
// RegisterSchema.methods.comparePassword = function(candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// const Register = mongoose.model('Register', RegisterSchema);

// module.exports = Register;
