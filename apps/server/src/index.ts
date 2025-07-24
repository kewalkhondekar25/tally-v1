import dotenv from "dotenv";
dotenv.config();
import app from "./app";

app.listen(process.env.PORT, () => {
    console.log(`SERVER IS LISTENING ON PORT: ${process.env.PORT}`);
});