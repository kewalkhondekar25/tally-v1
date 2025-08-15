import { customAlphabet } from "nanoid";

const generateSlug = () => {
    
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const slug = customAlphabet(alphabet, 7);
    return slug();
};

export { generateSlug };