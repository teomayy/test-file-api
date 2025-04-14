import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db'

export class Session extends Model {
	declare id: number
	declare userId: string
	declare deviceId: string
	declare refreshToken: string
}

Session.init(
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		userId: { type: DataTypes.STRING, allowNull: false },
		deviceId: { type: DataTypes.STRING, allowNull: false },
		refreshToken: { type: DataTypes.TEXT, allowNull: false },
	},
	{
		sequelize,
		tableName: 'sessions',
	}
)
