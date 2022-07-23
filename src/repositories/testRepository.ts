import { Prisma } from "@prisma/client";
import prisma from "../database.js";

export const getTestsByDiscipline = async (discipline: string) => {
    return prisma.term.findMany({
        where: {
            disciplines: {
                some: {
                    AND: {
                        name: discipline,
                        teacherDisciplines: { some: { tests: { some: {} } } },
                    },
                },
            },
        },
        include: {
            disciplines: {
                include: {
                    teacherDisciplines: {
                        include: {
                            teacher: true,
                            tests: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
};

export const getTestsByTeachers = async (teacher: string) => {
    return prisma.teacherDiscipline.findMany({
        where: {
            AND: { teacher: { name: teacher }, tests: { some: {} } },
        },
        include: {
            teacher: true,
            discipline: true,
            tests: {
                include: {
                    category: true,
                },
            },
        },
    });
};

export const insert = async (createTestData: Prisma.TestUncheckedCreateInput) => {
    await prisma.test.create({
        data: createTestData,
    });
};

export const getById = async (id: number) => {
    return prisma.test.findUnique({
        where: { id },
    });
};

export const view = async (id: number) => prisma.test.update({
    where: { id },
    data: { view: { increment: 1 } }
});