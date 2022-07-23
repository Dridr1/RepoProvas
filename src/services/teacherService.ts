import * as teacherRepository from "../repositories/teacherRepository.js";

export const getById = async (id: number) => {
    return teacherRepository.getById(id);
};

export const getByDiscipline = async (discipline: number) => {
    return teacherRepository.getByDiscipline(discipline);
};