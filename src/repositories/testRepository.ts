import { Prisma } from "@prisma/client";
import prisma from "../database.js";

export const insert = async (createTestData: Prisma.TestUncheckedCreateInput) => {
    await prisma.test.create({
        data: createTestData,
    });
};