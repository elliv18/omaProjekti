import { sign } from "jsonwebtoken";
//import logger from "../../misc/logger";
import * as bcrypt from "bcryptjs";
import { JWT_SECRET } from "../../environment";
const JWT_SECRET = "blahblah"
export default {
    Mutation: {
        login: async (_, args, context, info) => {
            const user = await context.prisma.query.user({
                where: {
                    email: args.email
                }
            })
            if (!user) {
                throw new Error("Email not found!");
            }

            const pwValid = await bcrypt.compare(args.password, user.password);

            if (!pwValid) {
                throw new Error("Password is invalid!");
            }

            const jwt = sign({ id: user.id, type: user.type }, JWT_SECRET);
            console.log('JWT', jwt)
            // return { user }
            return { jwt }

        }
    }
};

/*
 signUp: async (obj, { input: { email, password } }) => {
      const user = await prisma.user({ email: email });

      if (!user) {
        logger.log("warn", "[M signUp] Email %s not found", email);
        throw new Error("Email not found!");
      }

      const pwValid = await bcrypt.compare(password, user.password);

      if (!pwValid) {
        logger.log("warn", "[M signUp] Password is invalid from user %s", email);
        throw new Error("Password is invalid!");
      }

      const jwt = sign({ id: user.id, type: user.userType }, JWT_SECRET, {
        expiresIn: JWT_TIME
      });

      logger.log(
        "info",
        "[M signUp] signUp succesful! Logged user is: %s",
        email
      );
      return { jwt };
    }*/