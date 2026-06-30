import mongoose from 'mongoose';
import User from "../models/userModel.js";
import Vendor from '../models/vendorModel.js'; 
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';

export const registerVendor = async(req, res) => {
    const {ownerName, shopName, email, phone, password, confirm_password,  businessAddress} = req.body;

    const getDuplicateEmail = await User.findOne({email:email});
    if(getDuplicateEmail) throw 'This user is already registered';

    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create([{
            email,
            password: hashedPassword,
            role: "vendor",
        }], {session});

        const vendor = await Vendor.create([{
            userId: user[0]._id,
            ownerName,
            shopName,
            phone,
            businessAddress,
        }], {session})

        await session.commitTransaction();
        const accessToken = generateToken(user[0]._id, res);

        res.status(201).json({
            success: true,
            message: "Registration successful, waiting for admin approval",
            accessToken,
        });
    }catch(error){
        await session.abortTransaction();
        throw error;
    }finally{
        session.endSession();
    }
}

export const login = async(req, res) => {
    const {email, password} = req.body;

    const getUser = await User.findOne({email: email});
    if(!getUser) throw "Invalid Credentials";

    const comparePassword = bcrypt.compare(password, getUser.password);
    if(!comparePassword) throw 'Invalid Credentials!';

    const accessToken = generateToken(getUser._id, res);

    res.status(201).json({
        success: true,
        message: "Login successful",
        accessToken,
    });
}