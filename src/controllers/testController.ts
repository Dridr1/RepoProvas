import { Request, Response } from "express";
import * as testService from "../services/testService.js";

export const insert = async (req: Request, res: Response) => {
    await testService.insert(req.body);
    res.sendStatus(201);
};