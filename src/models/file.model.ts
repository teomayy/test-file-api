import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db'

export class File extends Model {
	declare id: number
	declare originalName: string
	declare extension: string
	declare mimeType: string
	declare size: number
	declare path: string
	declare uploadedAt: Date
}

File.init(
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		originalName: { type: DataTypes.STRING, allowNull: false },
		extension: { type: DataTypes.STRING, allowNull: false },
		mimeType: { type: DataTypes.STRING, allowNull: false },
		size: { type: DataTypes.INTEGER, allowNull: false },
		path: { type: DataTypes.STRING, allowNull: false },
		uploadedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	},
	{
		sequelize,
		tableName: 'files',
	}
)
