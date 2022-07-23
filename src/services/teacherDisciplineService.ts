import * as teachersDisciplinesRepository from "../repositories/teacherDisciplineRepository.js";

export const getByTeacherAndDiscipline = async (teacherId: number, disciplineId: number) => {
    return teachersDisciplinesRepository.getByTeacherAndDiscipline(
        teacherId,
        disciplineId
    );
};