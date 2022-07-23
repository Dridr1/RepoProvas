import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/database.js";
import userBodyFactory from "./fatories/userBodyFactory.js";
import userFactory from "./fatories/userFactory.js";

const agent = supertest(app);

describe("RepoProvas Tests", () => {
    describe("Login flow tests", () => {
        describe("POST sign-up", () => {
            it("Should return 201 status given a valid user data", async () => {
                const userTest = userBodyFactory();
                const signUpResponse = await agent.post("/sign-up").send(userTest);
                expect(signUpResponse.status).toBe(201);
            });
        });
        describe("POST sign-in", () => {
            it("Should return 200 status given a valid user data", async () => {
                const user = userBodyFactory();
                await userFactory(user);
                const signInResponse = await agent.post("/sign-in").send(user);
                expect(signInResponse.status).toBe(200);
            });
        });
    });
    afterAll(async () => await prisma.$disconnect());
});
