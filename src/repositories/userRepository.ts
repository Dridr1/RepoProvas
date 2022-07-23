import prisma from "../database.js";
import { CreateUserData } from "../services/userService.js";

export const findById = async (id: number) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
};

export const findByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
};

export const insert = async (createUserData: CreateUserData) => {
    return prisma.user.create({
        data: createUserData,
    });
};

export const truncate = async () => await prisma.$executeRaw`TRUNCATE TABLE users`;
