import { Request, Response } from "express";
import * as testService from "../services/testService.js";

export const insert = async (req: Request, res: Response) => {
    await testService.insert(req.body);
    res.sendStatus(201);
};

export const find = async (req: Request, res: Response) => {
    const { groupBy, teacher, discipline } = req.query as {
        groupBy: string;
        teacher: string;
        discipline: string;
    };

    if (groupBy !== "disciplines" && groupBy !== "teachers")
        return res.sendStatus(400);

    const tests = await testService.find({ groupBy, teacher, discipline });
    res.send({ tests });
};

export const view = async (req: Request, res: Response) => {
    const { id } = req.params;

    await testService.view(+id);
    res.sendStatus(200);
};