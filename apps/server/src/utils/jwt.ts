import jwt from "jsonwebtoken";

const generateToken = (userId: string, email: string) => {
    return jwt.sign({ userId, email}, process.env.JWT_SECRET!, { expiresIn: "1d"});
};

export {
    generateToken
};