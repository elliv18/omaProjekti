import { prisma } from "../../../generated/prisma-client";
import { USE_AUTH, AWS_BUCKET_NAME  } from "../../../environments";
//import { mustBeLoggedIn } from "../../../helpers/auth";
const { createWriteStream } = require('fs');
const AWS = require('aws-sdk')
var uuid = require('uuid');

AWS.config.loadFromPath('./credentials.json');
//AWS.config.update({ "accessKeyId": accessKeyId, "secretAccessKey": awsSecretKey, "region": region });


const s3 = new AWS.S3({ apiVersion: '2006-03-01' });



export default {
    Mutation: {
        async uploadImage(parent, { file, id }) {
        
            const { createReadStream, filename, mimetype } = await file
            const fileStream = createReadStream()
            

            // Muuttaa tiedoston nimen id.png/jpg
            const end = mimetype.replace("image/", ".")
            const key = id + end

            const uploadParams = { Bucket: AWS_BUCKET_NAME, Key: key, Body: fileStream };
            const result = await s3.upload(uploadParams).promise()

         //   console.log('** LOCATION **', result.Location)

            await prisma.updateVinyl({
                data: {
                    image: result.Location
                },
                where: {
                    id: id
                }
            })

           // console.log(result)


            return result.Location;
        }
    }
}

 /*     const { createReadStream, filename, mimetype, encoding } = await file;
                 const stream = createReadStream();
                 const uploadDir = './images';
                 const path = `${uploadDir}/${filename}`;
     
                 // Store the file in the filesystem.
                 await new Promise((resolve, reject) => {
                     stream.on('error', error => {
                         unlink(path, () => {
                             reject(error);
                         });
                     }).pipe(createWriteStream(path))
                         .on('error', reject)
                         .on('finish', resolve)
                 });
                 console.log('-----------file written');
                 return file;
     */