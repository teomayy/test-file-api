import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db'

export class User extends Model {
	declare id: string
	declare password: string
}

User.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'users',
	}
)
