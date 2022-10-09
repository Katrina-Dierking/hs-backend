import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  pic: {
    type: String,
    required: true,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
}, 
    {
        // to track when it's created and updated
        timestamps: true, 
    }
); 

//before saving, run this function to encrypt our password
userSchema.pre('save', async function(next) {
    //using mongoose functionality, if the password has been modified, move to the next part
    if(!this.isModified('password')) {
        next();
    }
    //using bcrypt functionality -- the higher the value, the more secure the password
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};

const User=mongoose.model("User", userSchema);

export default User

// model.exports = User; 

