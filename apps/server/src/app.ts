import express, { Express } from "express";
import cors from "cors"
import { routeNotFoundMiddleware } from "./middleware/routerNotFount.middleware";
import { errorHandlerMiddleware } from "./middleware/errorHandler.middleware";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN}));

//routes
import healthRouter from "./router/health.router";
app.use("/api/v1/health", healthRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "WELCOME TO TALLY API"
    })
});

app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;