import { Router } from 'express'
import { AuthController } from './auth.controller'

const router = Router()
const controller = new AuthController()

router.post('/signup', controller.signup)
router.post('/signin', controller.signin)
router.post('/signin/new_token', controller.refresh)
router.post('/logout', controller.logout)

export default router
