import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../src/app.js";
import prisma from "../src/database.js";
import { CreateTestData } from "../src/services/testService.js";
import tokenFactory from "./fatories/tokenFactory.js";
import userBodyFactory from "./fatories/userBodyFactory.js";
import userFactory from "./fatories/userFactory.js";

const agent = supertest(app);

describe("RepoProvas Integration Tests", () => {
    describe("POST /sign-up", () => {
        it("Should return 201 status given a valid user data", async () => {
            const userTest = userBodyFactory();
            const signUpResponse = await agent.post("/sign-up").send(userTest);
            expect(signUpResponse.status).toBe(201);
        });
    });

    describe("POST /sign-in", () => {
        it("Should return 200 status given a valid user data", async () => {
            const user = userBodyFactory();
            await userFactory(user);
            const signInResponse = await agent.post("/sign-in").send(user);
            expect(signInResponse.status).toBe(200);
        });
    });

    describe("GET /tests", () => {
        it("should return status 200 for valid params", async () => {
            const user = {
                email: faker.internet.email(),
                password: faker.internet.password(),
            };

            await agent.post("/sign-up").send(user);
            const signInResponse = await agent.post("/sign-in").send(user);
            const { token } = signInResponse.body;

            const response = await agent
                .get("/tests?groupBy=disciplines")
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toEqual(200);
        });

        it("should return status 200 for valid params", async () => {
            const token = await tokenFactory();

            const response = await agent
                .get("/tests?groupBy=disciplines&discipline=React")
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toEqual(200);
        });
    });

    describe("POST /tests", () => {
        const test: CreateTestData = {
            name: faker.lorem.words(2),
            pdfUrl: faker.internet.url(),
            categoryId: 1,
            disciplineId: 1,
            teacherId: 1,
        };


        it("should create a new test given a valid body", async () => {
            const token = await tokenFactory();

            const response = await agent
                .post("/tests")
                .set("Authorization", `Bearer ${token}`)
                .send(test);
            const testsWithSameName = await prisma.test.findMany({
                where: {
                    name: test.name,
                },
            });

            expect(response.status).toEqual(201);
            expect(testsWithSameName.length).toEqual(1);
        });
    });

    afterAll(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE tests`;
    });

    afterAll(async () => prisma.$disconnect());
});