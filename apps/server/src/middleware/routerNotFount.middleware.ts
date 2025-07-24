import { NextFunction, Request, Response } from "express";

const routeNotFoundMiddleware = (err: any, req: Request, res: Response) => {
    return res.status(500).send("ROUTE NOT FOUND")
};

export { routeNotFoundMiddleware };