import express, { Express } from "express";
import cors from "cors"

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN}));

export default app;