import { Router } from 'express'
import { authenticate } from '../auth/auth.middleware'
import { FileController } from './file.controller'
import { upload } from './file.middleware'

const controller = new FileController()
const router = Router()

router.post(
	'/upload',
	authenticate,
	upload.single('file'),
	async (req, res, next) => {
		try {
			await controller.upload(req, res)
		} catch (e) {
			next(e)
		}
	}
)

router.get('/list', authenticate, async (req, res, next) => {
	try {
		await controller.list(req, res)
	} catch (e) {
		next(e)
	}
})

router.get('/:id', authenticate, async (req, res, next) => {
	try {
		await controller.getOne(req, res)
	} catch (e) {
		next(e)
	}
})

router.get('/download/:id', authenticate, async (req, res, next) => {
	try {
		await controller.download(req, res)
	} catch (e) {
		next(e)
	}
})

router.delete('/delete/:id', authenticate, async (req, res, next) => {
	try {
		await controller.delete(req, res)
	} catch (e) {
		next(e)
	}
})

router.put(
	'/update/:id',
	authenticate,
	upload.single('file'),
	async (req, res, next) => {
		try {
			await controller.update(req, res)
		} catch (e) {
			next(e)
		}
	}
)

export default router
