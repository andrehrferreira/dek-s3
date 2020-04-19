import multer from "multer";
import path from "path";
import crypto from "crypto";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import md5 from "md5";

import {
    $
} from "@dekproject/scope";

export default async () => {
    try {
        if (
            !Object.prototype.hasOwnProperty.call(
                process.env,
                "S3_TMP_UPLOAD_DIRETORY"
            )
        ) {
            // eslint-disable-next-line no-console
            console.log(
                "[ S3 ] - There is no S3_TMP_UPLOAD_DIRETORY variable in the .env file."
            );
        } else if (
            !Object.prototype.hasOwnProperty.call(process.env, "S3_BUCKET_NAME")
        ) {
            // eslint-disable-next-line no-console
            console.log(
                "[ S3 ] - There is no S3_BUCKET_NAME variable in the .env file."
            );
        } else if (
            !Object.prototype.hasOwnProperty.call(
                process.env,
                "AWS_ACCESS_KEY_ID"
            )
        ) {
            // eslint-disable-next-line no-console
            console.log(
                "[ S3 ] - There is no AWS_ACCESS_KEY_ID variable in the .env file."
            );
        } else if (
            !Object.prototype.hasOwnProperty.call(
                process.env,
                "AWS_SECRET_ACCESS_KEY"
            )
        ) {
            // eslint-disable-next-line no-console
            console.log(
                "[ S3 ] - There is no AWS_SECRET_ACCESS_KEY variable in the .env file."
            );
        } else if (
            !Object.prototype.hasOwnProperty.call(
                process.env,
                "AWS_DEFAULT_REGION"
            )
        ) {
            // eslint-disable-next-line no-console
            console.log(
                "[ S3 ] - There is no AWS_DEFAULT_REGION variable in the .env file."
            );
        } else {
            $.set(
                "s3",
                multer({
                    dest: path.resolve(process.env.S3_TMP_UPLOAD_DIRETORY),
                    storage: multerS3({
                        s3: new aws.S3(),
                        bucket: process.env.S3_BUCKET_NAME,
                        contentType: multerS3.AUTO_CONTENT_TYPE,
                        acl: "public-read",
                        key: (req, file, cb) => {
                            crypto.randomBytes(16, (err, hash) => {
                                if (err) cb(err);
                                else {
                                    const hashHex = hash.toString("hex");
                                    const fileName = `${hashHex.substring(
                                        0,
                                        2
                                    )}/${hashHex.substring(
                                        2,
                                        5
                                    )}/${hashHex.substring(
                                        5,
                                        9
                                    )}/${hashHex.substring(
                                        9,
                                        14
                                    )}/${hashHex.substring(14, 20)}/${md5(
                                        file.originalname
                                    )}${path.extname(file.originalname)}`;
                                    cb(null, fileName);
                                }
                            });
                        },
                    }),
                    limits: {
                        fileSize: 5 * 1024 * 1024,
                    },
                })
            );
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(`[ S3 ] - ${e.message}`);
    }
};
