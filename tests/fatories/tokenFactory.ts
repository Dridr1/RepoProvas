import jwt from "jsonwebtoken";
import userBodyFactory from "./userBodyFactory.js";
import userFactory from "./userFactory";

const tokenFactory = async () => {
    const user = userBodyFactory();
    const createdUser = await userFactory(user);
    return jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET);
};

export default tokenFactory;