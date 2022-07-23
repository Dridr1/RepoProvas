import app from "../src/app.js";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import prisma from "../src/database.js";

describe("RepoProvas Tests", () => {
    const user = {
        email: faker.internet.email(),
        password: faker.internet.password()
    };
    describe("POST sign-up", () => {
        it("Should return 201 status given a valid user data", async () => {
            const signUpResponse = await supertest(app).post("/sign-up").send(user);
            expect(signUpResponse.status).toBe(201);
        });
    });
    describe("POST sign-in", () => {
        it("Should return 200 status given a valid user data", async () => {
            const signInResponse = await supertest(app).post("/sign-in").send(user);
            expect(signInResponse.status).toBe(200);
        });
    });
    afterAll(async () => await prisma.$disconnect());
});
