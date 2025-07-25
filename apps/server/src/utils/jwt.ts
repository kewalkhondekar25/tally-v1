import jwt from "jsonwebtoken";

const generateToken = (userId: string, email: string) => {
    return jwt.sign({ userId, email}, process.env.JWT_SECRET!, { expiresIn: "1d"});
};

const verifyToken = (token: string) => {
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET!);
    return jwtPayload;
};

export {
    generateToken,
    verifyToken
};