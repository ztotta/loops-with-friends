var mongoose     = require('mongoose'),
    Schema       = mongoose.Schema,
    Station      = require('./station'),
    bcrypt       = require('bcrypt-nodejs');

//||||||||||||||||||||||||||--
// CREATE USER SCHEMA
//||||||||||||||||||||||||||--
var UserSchema   = new Schema({
  name:        { type: String, required: true },
  email: {
                 type: String,
                 required: true,
                 index: { unique: true }
  },
  password:    { type: String, required: true, select: false },
	stationIds:		 [{type: mongoose.Schema.Types.ObjectId, ref: 'Station'}]
});

// exclude password
UserSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
  var user = this;

  // hash the password only if the password has been changed or user is new
  if (!user.isModified('password')) return next();

  // generate the hash
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);

    // change the password to the hashed version
    user.password = hash;
    next();
  });
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
  var user = this;

  return bcrypt.compareSync(password, user.password);
};

// Access user's stations
UserSchema.methods.stations = function(callback) {
  mongoose.model('Station').find({user: this._id}, function(err, stations) {
    callback(err, stations);
  });
};

module.exports = mongoose.model('User', UserSchema);
