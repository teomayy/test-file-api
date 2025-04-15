import { existsSync, mkdirSync } from 'fs'
import multer from 'multer'

const uploadDir = 'uploads'

if (!existsSync(uploadDir)) {
	mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, uploadDir)
	},
	filename: (_req, file, cb) => {
		const uniqueName = Date.now() + '-' + file.originalname
		cb(null, uniqueName)
	},
})

export const upload = multer({ storage })
