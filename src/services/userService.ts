import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository.js";
import { conflictError, notFoundError, unauthorizedError } from "../utils/errorUtils.js";

export type CreateUserData = Omit<User, "id">;

export const signUp = async (createUserData: CreateUserData) => {
    const existingUser = await userRepository.findByEmail(createUserData.email);
    if (existingUser) throw conflictError("Email must be unique");

    const hashedPassword = bcrypt.hashSync(createUserData.password, 12);

    await userRepository.insert({ ...createUserData, password: hashedPassword });
};

export const signIn = async (loginData: CreateUserData) => {
    const user = await getUserOrFail(loginData);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    return token;
};

export const findById = async (id: number) => {
    const user = await userRepository.findById(id);
    if (!user) throw notFoundError("User not found");

    return user;
};

export const getUserOrFail = async (loginData: CreateUserData) => {
    const user = await userRepository.findByEmail(loginData.email);
    if (!user) throw unauthorizedError("Invalid credentials");

    const isPasswordValid = bcrypt.compareSync(loginData.password, user.password);
    if (!isPasswordValid) throw unauthorizedError("Invalid credentials");

    return user;
};

export const truncate = async () => await userRepository.truncate();
