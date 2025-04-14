import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
	dialect: 'mysql',
	host: process.env.DB_HOST || 'localhost',
	username: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || 'Dadiyanki12!',
	database: process.env.DB_NAME || 'file_api',
	logging: false,
})
