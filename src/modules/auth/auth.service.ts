import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { User } from '../../models/user.model'
import { SignInDto, SignUpDto } from './auth.types'
import { generateTokens } from './auth.utils'

import jwt from 'jsonwebtoken'
import { Session } from '../../models/session.model'

export class AuthService {
	async register(dto: SignUpDto) {
		const existing = await User.findByPk(dto.id)
		if (existing) throw new Error('User already exists')

		const hash = await bcrypt.hash(dto.password, 10)
		const user = await User.create({ id: dto.id, password: hash })

		const tokens = generateTokens({ userId: user.id })
		return tokens
	}

	async login(dto: SignInDto) {
		const user = await User.findByPk(dto.id)
		if (!user) throw new Error('Invalid credentials')

		const match = await bcrypt.compare(dto.password, user.password)
		if (!match) throw new Error('Invalid credentials')

		const deviceId = uuidv4()
		const tokens = generateTokens({ userId: user.id, deviceId })

		await Session.create({
			userId: user.id,
			deviceId,
			refreshToken: tokens.refreshToken,
		})
		return tokens
	}

	async refreshToken(oldToken: string) {
		try {
			const payload = jwt.verify(
				oldToken,
				process.env.JWT_REFRESH_SECRET!
			) as any
			const session = await Session.findOne({
				where: {
					userId: payload.userId,
					deviceId: payload.deviceId,
					refreshToken: oldToken,
				},
			})

			if (!session) throw new Error('Invalid session or token')

			const newTokens = generateTokens({
				userId: payload.userId,
				deviceId: payload.deviceId,
			})

			session.refreshToken = newTokens.refreshToken
			await session.save()

			return newTokens
		} catch (error) {
			throw new Error('Invalid or expired refresh token')
		}
	}

	async logout(refreshToken: string) {
		await Session.destroy({ where: { refreshToken } })
	}
}
