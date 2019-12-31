const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
aws.config.update({
  region: 'ap-south-1',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID
})

s3 = new aws.S3();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
}

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error("Invalid MIME type");
//     if (isValid) {
//       error = null;
//     }
//     cb(error, "images");
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname.toLowerCase().replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_').split(' ').join('-');
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, name + '-' + Date.now() + '.' + ext);
//   }
// });

const storage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid MIME type");
      if (isValid) {
        error = null;
      }
      const name = file.originalname.toLowerCase().replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_').split(' ').join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(error, name + '-' + Date.now() + '.' + ext);
    },
    acl: 'public-read'
  })
})

module.exports = storage.single("image");
