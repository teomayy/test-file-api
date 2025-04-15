import { NextFunction, Request, Response, Router } from 'express'
import { validateBody } from '../../utils/validate'
import { AuthController } from './auth.controller'
import { authenticate } from './auth.middleware'
import { signSchema } from './auth.validation'

const router = Router()
const controller = new AuthController()

router.post('/signup', validateBody(signSchema), async (req, res, next) => {
	try {
		await controller.signup(req, res)
	} catch (error) {
		next(error)
	}
})

router.post('/signin', validateBody(signSchema), async (req, res, next) => {
	try {
		await controller.signin(req, res)
	} catch (err) {
		next(err)
	}
})

router.post(
	'/signin/new_token',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await controller.refresh(req, res)
		} catch (err) {
			next(err)
		}
	}
)

router.post(
	'/logout',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await controller.logout(req, res)
		} catch (err) {
			next(err)
		}
	}
)

router.get('/info', authenticate, async (req, res, next) => {
	try {
		await controller.info(req, res)
	} catch (e) {
		next(e)
	}
})
export default router
