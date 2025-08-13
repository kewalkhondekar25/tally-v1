import { customAlphabet } from "nanoid";

const generateSlug = () => {
    
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const slug = customAlphabet(alphabet, 7);
    return slug();
};

export { generateSlug };