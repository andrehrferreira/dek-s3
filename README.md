# @dekproject/s3

AWS S3 interface plugin for DEK

What does this plugin do?

* Control configuration for connection to AWS S3 in production development mode in a simplified way with **dotenv**
* Performs connection implementation along the lines ES6 being pre requirement to start the project

## Instalation

To install the bootstrap we recommend using the CLI

```bash
$ yarn add @dekproject/s3 --save
$ nano .env
```

In the .env file add the following settings

```
S3_BUCKET_NAME=bucket-name
S3_TMP_UPLOAD_DIRETORY=./

AWS_ACCESS_KEY_ID=AWS_KEY
AWS_SECRET_ACCESS_KEY=AWS_SECRET
AWS_DEFAULT_REGION=AWS_REGION
```

## Usage

Using direct

```bash
$ npm i @dekproject/scope
```

Using in the standard DEK skeleton

```js
import { $, app, s3 } from "@dekproject/scope";

app.get("/upload", s3.single("file"), (req, res) => {
    const {
        originalname: name,
        size,
        key,
        location: url = ""
    } = req.file;

    console.log(url);//https://mybucket.s3.amazonaws.com/as12d31as23d12a3s1da3s2d
});

$.wait("s3").then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
});
```
