import * as faker from "faker";
import { prisma } from "../generated/prisma-client";
import { SALT_ROUNDS } from "../environments";
import * as bcrypt from "bcryptjs";

export default async (amount) => {
    if (
        (await prisma
            .usersConnection()
            .aggregate()
            .count()) < 1
    ) {
        process.stdout.write("Generating random test data");
        for (let i = 0; i < amount; i += 1) {
            // make new staffs
            await prisma.createUser({
                type: "USER",
                email: faker.internet.email(),
                name: faker.name.firstName(),
                password: await bcrypt.hash(faker.internet.password(), SALT_ROUNDS),

            });
            process.stdout.write(".");

            // make new artist'
            const artist = await prisma.createArtist({
                name: faker.name.firstName() + " " + faker.name.lastName()
            })
            process.stdout.write(".");

            const category = await prisma.createCategory({
                name: faker.commerce.product(),
            })


            await prisma.createVinyl({
                type: "LP",
                name: faker.hacker.adjective() + " " + faker.random.words(2),
                category: {
                    connect: {
                        id: category.id
                    }
                },
                year: faker.date.future(),
                condition: "GOOD",
                artists: {
                    connect: { name: artist.name }
                }

            })

            process.stdout.write(".");

            await prisma.createVinyl({
                type: "SAVIKIEKKO",
                name: faker.hacker.adjective() + " " + faker.company.companyName(),
                category: {
                    connect: {
                        id: category.id
                    }
                },
                year: faker.date.future(),
                condition: "POOR",
                artists: {
                    connect: { name: artist.name }
                }

            })

            process.stdout.write(".");


        }
    }
};
