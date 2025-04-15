import { Request, Response } from 'express'
import { AuthService } from './auth.service'

const authService = new AuthService()

export class AuthController {
	signup = async (req: Request, res: Response) => {
		const { id, password } = req.body
		if (!id || !password) {
			return res.status(400).json({ message: 'id and password are required' })
		}
		try {
			const tokens = await authService.register(req.body)
			res.json(tokens)
		} catch (error) {
			res.status(400).json({ message: (error as Error).message })
		}
	}

	signin = async (req: Request, res: Response) => {
		const { id, password } = req.body
		if (!id || !password) {
			return res.status(400).json({ message: 'id and password are required' })
		}
		try {
			const tokens = await authService.login(req.body)
			res.json(tokens)
		} catch (error) {
			res.status(400).json({ message: (error as Error).message })
		}
	}

	refresh = async (req: Request, res: Response) => {
		try {
			const { refreshToken } = req.body
			if (!refreshToken) return res.status(400).json({ message: 'No token' })

			const tokens = await authService.refreshToken(refreshToken)
			res.json(tokens)
		} catch (error) {
			res.status(401).json({ message: (error as Error).message })
		}
	}

	logout = async (req: Request, res: Response) => {
		try {
			const { refreshToken } = req.body
			if (!refreshToken) return res.status(400).json({ message: 'No token' })

			await authService.logout(refreshToken)
			res.json({ message: 'Logged out' })
		} catch (error) {
			res.status(400).json({ message: (error as Error).message })
		}
	}

	info = async (req: Request, res: Response) => {
		const user = req.user
		if (!user) return res.status(401).json({ message: 'Unauthorized' })
		res.json({ id: user.userId })
	}
}
