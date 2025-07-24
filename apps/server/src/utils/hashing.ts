import bcrypt from "bcryptjs";

const hashPassword = async (password: string) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

const checkPassword = async (password: string, hashedPassword: string) => {
    try {
        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
        return isPasswordCorrect
    } catch (error) {
        throw error;
    }
};

export { 
    hashPassword,
    checkPassword
}