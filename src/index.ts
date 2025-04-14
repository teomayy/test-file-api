import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { sequelize } from './config/db'
import router from './modules/auth/auth.routes'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('auth', router)

sequelize.sync().then(() => {
	app.listen(process.env.PORT, () => {
		console.log(`🚀 Server running on port ${process.env.PORT}`)
	})
})
