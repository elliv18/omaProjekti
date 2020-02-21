import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../environments";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export default {
    Query: {

        validateJwt: async (_, { input: { id } }) => {
            const isValid = await jwt.verify(id, JWT_SECRET);
            return { isValid }
        },
    }
}