import { Op } from "sequelize";
import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import { comparePassword, generateToken } from "../../../utilities/bcrypt.util";

export async function signinController(request: Request, response: Response, next: NextFunction) {
    try {
        const { email, password } = request.body as any;
        let user = await User.findOne({ where: { email } });

        if (!user) return response.status(404).json({ message: "User not found" });
        const isPasswordValid =  comparePassword(password, user.password);

        if (!isPasswordValid) return response.status(401).json({ message: "Invalid credentials" });
        const token = generateToken(user);

        response.status(200).json({ token, user: user.toJSON() });
    } catch (error) {
        next(error);
    };
};

export async function signupController(request: Request, response: Response, next: NextFunction) {
    try {
        const { email, username, password } = request.body as any;
        let existingUser = await User.findOne({ where: { [Op.or]: [{ email }, { username }] } });

        if (existingUser) return response.status(409).json({ message: "Email or username already exists" });
        const newUser = await User.create({ email, username, password });

        const token = generateToken(newUser);
        response.status(200).json({ token, user: newUser.toJSON() });
    } catch (error) {
        next(error);
    };
};

export default {
    signinController,
    signupController,
};
