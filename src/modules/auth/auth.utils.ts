import jwt from 'jsonwebtoken'

interface TokenPayload {
	userId: string
	deviceId?: string
}

export const generateTokens = (payload: TokenPayload) => {
	const accessToken = jwt.sign(
		{ userId: payload.userId, deviceId: payload.deviceId },
		process.env.JWT_SECRET!,
		{
			expiresIn: '10m',
		}
	)
	const refreshToken = jwt.sign(
		{ userId: payload.userId, deviceId: payload.deviceId },
		process.env.JWT_REFRESH_SECRET!,
		{
			expiresIn: '7d',
		}
	)

	return { accessToken, refreshToken }
}
