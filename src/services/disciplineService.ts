import * as disciplineRepository from "../repositories/disciplineRepository.js";

export const getById = async (id: number) => {
    return disciplineRepository.getById(id);
};

export const getByTerm = async (term: number) => {
    return disciplineRepository.getByTerm(term);
};