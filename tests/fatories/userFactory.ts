import bcrypt from "bcrypt";
import prisma from "../../src/database.js";
import { CreateUserData } from "../../src/services/userService.js";

const userFactory = async (user: CreateUserData) => {
    return prisma.user.create({
        data: {
            ...user,
            password: bcrypt.hashSync(user.password, 10),
        },
    });
};

export default userFactory;