import "dotenv/config";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import User from "../modules/account/models/user.model";

export function comparePassword(plain: string, hashed: string) {
    return bcrypt.compareSync(plain, hashed);
};

export async function encryptPassword(password: string) {
    const hashed = await bcrypt.hash(password, await bcrypt.genSalt(10));
    return hashed;
};

export function generateToken(user: User) {
    let key = process.env.JWT_SECRET;
    if (!key) throw new Error("secret key is not set");

    return jwt.sign(user.toJSON(), key, { expiresIn: "4h" });
};
