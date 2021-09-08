const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2

const ACCEPTED_FILE = [ 'image/jpg', 'image/jpeg', 'image/png' ];

const fileFilter = (req, file, cb) => {
    if(!ACCEPTED_FILE.includes(file.mimetype)) {
        const error = new Error ('Extensión del archivo inválida.')
        error.status = 400;
        return cb(error);
    }
    return cb(null, true);
};

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
    destination: (req, file, cb) => {
        const directory = path.join(__dirname, '../public/uploads');
        cb(null, directory);
    }
});

const upload = multer({
    storage,
    fileFilter
});

const uploadToCloudinary = async (req, res, next) => {
    if(req.file) {
        const path = req.file.path;
        const image = await cloudinary.uploader.upload(path);

        req.imageUrl = image.secure_url;

        await fs.unlinkSync(path);

        return next();
    } else {
        return next();
    }
};

module.exports = { upload, uploadToCloudinary };