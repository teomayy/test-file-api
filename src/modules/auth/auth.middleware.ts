import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
	userId: string
	deviceId: string
	iat: number
	exp: number
}

export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const authHeader = req.headers.authorization

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		res.status(401).json({ message: 'Unauthorized' })
		return
	}

	const token = authHeader.split(' ')[1]

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
		req.user = { userId: decoded.userId, deviceId: decoded.deviceId }
		next()
	} catch (error) {
		res.status(403).json({ message: 'Token is invalid or expired' })
	}
}
