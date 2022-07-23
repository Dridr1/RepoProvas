import prisma from "../database.js";

export const getByTeacherAndDiscipline = async (
    teacherId: number,
    disciplineId: number
) => {
    return prisma.teacherDiscipline.findFirst({
        where: { AND: { disciplineId, teacherId } },
    });
};

export default getByTeacherAndDiscipline;