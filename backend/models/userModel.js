import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema for users
const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    isAdmin: { 
      type: Boolean, 
      required: true, 
      default: false 
    },
    isVerified: { 
      type: Boolean, 
      default: false 
    },
    // Fields for OTP Verification
    otp: { 
      type: String, 
      default: null 
    },
    otpExpires: { 
      type: Date, 
      default: null 
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving a new user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;