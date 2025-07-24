import { NextFunction, Request, Response } from "express";

const routeNotFoundMiddleware = (req: Request, res: Response) => {
    return res.status(500).send("ROUTE NOT FOUND")
};

export { routeNotFoundMiddleware };