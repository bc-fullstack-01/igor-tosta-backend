const multer = require('multer')

const {
    S3Client,
    PutObjectCommand
} = require('@aws-sdk/client-s3')

const upload = multer({
    storage: multer.memoryStorage()
})

const bucketName = 'first-bucket'
const config = {
    region: 'us-east-1',
    endpoint: process.env.BUCKET_ENDPOINT || 'http://localhost:9000/',
    forcePathStyle: true,
    sslEnabled: false,
    signatureVersion: 'v4',
    credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY || 'IgorTosta',
        secretAccessKey: process.env.BUCKET_SECRET_KEY || 'igortosta'
    }
}

const s3Client = new S3Client(config)
module.exports = [
    upload.single('file'), (req, res, next) => {
        if (req.file) {
            const filename = `${req.user.profile.id}/${req.file.originalname}`
            console.log("Tosta")
            return s3Client.send(new PutObjectCommand({
                Bucket: bucketName,
                Key: filename,
                ContentType: req.file.mimetype,
                Body: req.file.buffer
            }))
                .then(() => {
                    req.body.image = true
                    console.log("Igor")
                    req.body.description = `${process.env.BUCKET_HOST || config.endpoint}${bucketName}/${filename}`
                    return next()
                })
                .catch(next)
        } else {
            next()
        }
    }
]