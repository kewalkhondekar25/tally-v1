import { NextFunction, Request, Response } from "express";

const routeNotFoundMiddleware = (req: Request, res: Response) => {
    return res.status(404).send("ROUTE NOT FOUND")
};

export { routeNotFoundMiddleware };