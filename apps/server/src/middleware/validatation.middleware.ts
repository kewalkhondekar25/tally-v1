import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const validate = (schema: ZodTypeAny) => {

  return (req: Request, res: Response, next: NextFunction) => {
    
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
        return next(result.error);
    }

    req.body = result.data;
    next();
  };
};

export { validate };
