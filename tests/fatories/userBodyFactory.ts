import { faker } from "@faker-js/faker";
import { CreateUserData } from "../../src/services/userService";

const userBodyFactory = (): CreateUserData => {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
};

export default userBodyFactory;