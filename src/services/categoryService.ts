import * as categoryRepository from "../repositories/categoryRepository.js";

export const findMany = () => {
    return categoryRepository.findMany();
};

export const getById = async (id: number) => {
    return categoryRepository.getById(id);
};