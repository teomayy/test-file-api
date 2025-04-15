import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { sequelize } from './config/db'
import router from './modules/auth/auth.routes'
import fileRoutes from './modules/file/file.routes'

dotenv.config()

const envSchema = Joi.object({
	PORT: Joi.number().default(4000),
	DB_HOST: Joi.string().required(),
	DB_USER: Joi.string().required(),
	DB_PASSWORD: Joi.string().required(),
	DB_NAME: Joi.string().required(),
	JWT_SECRET: Joi.string().required(),
	JWT_REFRESH_SECRET: Joi.string().required(),
}).unknown()

const { error, value: envVars } = envSchema.validate(process.env)
if (error) {
	throw new Error(`.env validation error: ${error.message}`)
}

const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth', router)
app.use('/file', fileRoutes)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.error('Global Error:', err)
	res.status(500).json({ message: 'Internal Server Error' })
})

app.listen(envVars.PORT, async () => {
	console.log(`Server running on port ${envVars.PORT}`)
	try {
		await sequelize.authenticate()
		console.log('Database connected')
	} catch (dbError) {
		console.error('Failed to connect to the database:', dbError)
		process.exit(1)
	}
})
