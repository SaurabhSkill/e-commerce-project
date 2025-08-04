import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';

// --- THIS FUNCTION IS NOW CORRECTED ---
// @desc    Request password reset OTP
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // 1. Check if the user exists
    if (!user) {
      // If not, send a 404 error with a clear message
      return res.status(404).json({ message: 'User with that email does not exist. Please create an account.' });
    }

    // If user exists, proceed with sending the OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const emailHtml = `<p>Hello ${user.name},</p><p>Your password reset OTP is: <strong>${otp}</strong></p><p>This code will expire in 10 minutes.</p>`;
    await sendEmail({
      email: user.email,
      subject: 'Your Password Reset OTP',
      html: emailHtml,
    });

    res.status(200).json({ message: 'A password reset OTP has been sent to your email.' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      if (!user.isVerified) {
        return res.status(401).json({ message: 'Please verify your email before logging in' });
      }
      generateToken(req, res, user._id);
      res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists && userExists.isVerified) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    let user;
    if (userExists) {
      user = userExists;
      user.name = name;
      user.password = password;
      user.otp = otp;
      user.otpExpires = otpExpires;
    } else {
      user = new User({ name, email, password, otp, otpExpires });
    }
    await user.save();
    const emailHtml = `<p>Hello ${user.name},</p><p>Your verification OTP is: <strong>${otp}</strong></p><p>This code will expire in 10 minutes.</p>`;
    await sendEmail({
      email: user.email,
      subject: 'MERN Shop - Email Verification OTP',
      html: emailHtml,
    });
    res.status(201).json({
      message: 'Registration successful! An OTP has been sent to your email.',
      email: user.email,
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Could not send verification email. Please check server logs.' });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    generateToken(req, res, user._id);
    res.status(200).json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Server error during OTP verification.' });
  }
};

const logoutUser = (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logged out successfully' });
};

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        generateToken(req, res, updatedUser._id);
        res.json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, isAdmin: updatedUser.isAdmin });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if (user.isAdmin) {
            res.status(400).json({ message: 'Cannot delete admin user' });
            return;
        }
        await User.deleteOne({ _id: user._id });
        res.json({ message: 'User removed' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        const updatedUser = await user.save();
        res.json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, isAdmin: updatedUser.isAdmin });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const admins = async (req, res) => {
    const adminUsers = await User.find({ isAdmin: true });
    res.json(adminUsers);
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP. Please try again.' });
    }
    user.password = password;
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    res.status(200).json({ message: 'Password has been reset successfully. You can now log in.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  admins,
  forgotPasswordRequest,
  resetPassword,
  verifyOtp,
};
