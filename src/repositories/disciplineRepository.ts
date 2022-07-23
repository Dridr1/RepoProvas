import prisma from "../database.js";

export const getById = async (id: number) => {
    return prisma.discipline.findUnique({ where: { id }, });
};

export const getByTerm = async (term: number) => {
    return prisma.discipline.findMany({ where: { termId: term }, });
};