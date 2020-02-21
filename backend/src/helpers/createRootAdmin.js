import { prisma } from "../generated/prisma-client";
import * as bcrypt from "bcryptjs";
import {
    ROOT_ADMIN_EMAIL,
    ROOT_ADMIN_PASS,
    ROOT_ADMIN_NAME,
    SALT_ROUNDS
} from "../environments";

export default async () => {
    console.log('CREATING ROOT ADMIN')
    // is db empty?
    if (
        (await prisma
            .usersConnection()
            .aggregate()
            .count()) < 1 ||
        (await prisma.user({ email: ROOT_ADMIN_EMAIL })) === null
    ) {
        await prisma.createUser({
            type: "ADMIN",
            email: ROOT_ADMIN_EMAIL,
            password: await bcrypt.hash(ROOT_ADMIN_PASS, SALT_ROUNDS),
            name: ROOT_ADMIN_NAME,

        });

    }
};

