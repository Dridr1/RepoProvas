import prisma from "../database.js";

export const getById = async (id: number) => {
    return prisma.teacher.findUnique({
        where: { id },
    });
};

export const getByDiscipline = async (discipline: number) => {
    return prisma.teacher.findMany({
        where: { teacherDisciplines: { some: { disciplineId: discipline } } },
    });
};