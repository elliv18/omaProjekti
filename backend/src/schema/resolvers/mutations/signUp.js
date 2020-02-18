import { sign } from "jsonwebtoken";
//import logger from "../../misc/logger";
import * as bcrypt from "bcryptjs";
import { prisma } from "../../../generated/prisma-client";
import { SALT_ROUNDS } from "../../../environments";
//import { JWT_SECRET, JWT_TIME } from "../../environment";
import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {

    signUp: async (_, { input: { name, email, password, passwordAgain } }) => {
      console.log('signUp: ', prisma.user)
      const isUser = await prisma.user({
        email: email

      })
      if (isUser !== null) {
        throw new Error("Email already exist!");
      }

      if (password !== passwordAgain) {
        throw new Error("Password don't match!");
      }

      const user = await prisma.createUser(
        {
          type: 'USER',
          email: email,
          password: await bcrypt.hash(password, 10),
          name: name

        },
      )
      return { user }
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