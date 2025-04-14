import jwt from 'jsonwebtoken'

export const generateTokens = (payload: object) => {
	const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
		expiresIn: '10m',
	})
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
		expiresIn: '7d',
	})

	return { accessToken, refreshToken }
}
