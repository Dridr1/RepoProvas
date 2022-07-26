import { Request, Response } from "express";
import { AppError, errorTypeToStatusCode, isAppError, } from "../utils/errorUtils.js";

export const errorHandlerMiddleware = async (err: Error | AppError, req: Request, res: Response) => {
    console.log(err);

    if (isAppError(err)) {
        return res.status(errorTypeToStatusCode(err.type)).send(err.message);
    }

    return res.sendStatus(500);
};
