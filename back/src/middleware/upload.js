import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
	destination: process.env.BACK_NODE_ENV === 'production' ? '/usr/src/app/uploads' : '/tmp/zombicalypse/uploads',
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname)
		const customName = 'avatar-' + req.user.uuid.slice(0, 4) + Date.now()
		cb(null, customName + ext);
	}
})

const fileFilter = (req, file, cb) => {
	const allowedTypes = /jpeg|jpg|png/;

	const ext = path.extname(file.originalname).toLowerCase();
	const mime = file.mimetype;

	if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
		cb(null, true);
	} else {
		cb(new Error('Only .jpg, .jpeg, and .png files are allowed'));
	}
}

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 4 * 1024 * 1024 } // 4MB in bytes
})

export default upload
