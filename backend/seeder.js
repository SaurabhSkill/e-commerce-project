import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import largeProductSet from './data/products_large.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // 1. Clear old data for Orders and Users
    await Order.deleteMany();
    await User.deleteMany();

    // 2. Create users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // 3. Use "Upsert" for products to prevent duplicates
    console.log('Starting product import (this may take a moment)...');
    for (const productData of largeProductSet) {
      await Product.updateOne(
        { name: productData.name }, // Find a product with this name
        {
          $set: {
            ...productData,
            user: adminUser,
          },
        },
        { upsert: true } // If it doesn't exist, create it. If it exists, update it.
      );
    }

    console.log('Data Imported Successfully!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
