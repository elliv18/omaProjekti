import { sign } from "jsonwebtoken";
//import logger from "../../misc/logger";
import * as bcrypt from "bcryptjs";
import { prisma } from "../../generated/prisma-client";
import { SALT_ROUNDS } from "../../environments";
//import { JWT_SECRET, JWT_TIME } from "../../environment";
const JWT_SECRET = "blahblah"
export default {
  Mutation: {

    signUp: async (_, args, context, info) => {
      console.log('signUp: ', SALT_ROUNDS)
      const isUser = await context.prisma.query.user({
        where: {
          email: args.email
        }
      })
      if (isUser !== null) {
        throw new Error("Email already exist!");
      }

      if (args.password !== args.passwordAgain) {
        throw new Error("Password don't match!");
      }

      const user = context.prisma.mutation.createUser(
        {
          data: {
            type: 'USER',
            email: args.email,
            password: await bcrypt.hash(args.password, 10),
            name: args.name
            /* author: {
                 connect: {
                     id: args.authorId,
                 },
             },*/
          },
        },
        info,
      )
      return user
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