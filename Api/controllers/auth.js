import User from "../model/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        isAdmin:req.body.isAdmin,
    });

    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser);
    }
    catch(err)
    {
        next(err);
    }
};

export const login = async (req, res, next) => {

    try {
        const user = await User.findOne({username:req.body.username});
        if(!user) return next(createError(404, "User not found !"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or username !"));

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin}, process.env.JWT_Secret)

        const {password, isAdmin, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {httpOnly: true}).status(200).json({...otherDetails});
    }
    catch(err)
    {
        next(err);
    }
};  