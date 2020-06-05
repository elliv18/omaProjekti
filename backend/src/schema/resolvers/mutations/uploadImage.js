import { prisma } from "../../../generated/prisma-client";
import { USE_AUTH } from "../../../environments";
//import { mustBeLoggedIn } from "../../../helpers/auth";
const { createWriteStream } = require('fs');



export default {
    Mutation: {
        async uploadImage(parent, { file }) {
            const { createReadStream, filename, mimetype, encoding } = await file;
            const stream = createReadStream();
            // Store the file in the filesystem.
            await new Promise((resolve, reject) => {
                stream.on('error', error => {
                    unlink(path, () => {
                        reject(error);
                    });
                }).pipe(createWriteStream(filename))
                    .on('error', reject)
                    .on('finish', resolve)
            });
            console.log('-----------file written');
            return file;
        }
    }
}