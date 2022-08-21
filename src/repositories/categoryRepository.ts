import prisma from "../database.js";

export const findMany = async () => {
    return prisma.category.findMany();
};

export const getById = async (id: number) => {
    return prisma.category.findUnique({
        where: { id },
    });
};