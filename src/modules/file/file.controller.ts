import { Request, Response } from 'express'
import fs from 'fs'
import * as fsp from 'fs/promises'
import path from 'path'
import { File } from '../../models/file.model'

export class FileController {
	upload = async (req: Request, res: Response) => {
		if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

		const { originalname, mimetype, size, filename, path: filePath } = req.file

		const extension = path.extname(originalname).replace('.', '')

		const created = await File.create({
			originalName: originalname,
			extension,
			mimeType: mimetype,
			size,
			path: filePath,
		})

		res.status(201).json({
			message: 'File uploaded successfully',
			file: created,
		})
	}

	list = async (req: Request, res: Response) => {
		const page = parseInt(req.query.page as string) || 1
		const listSize = parseInt(req.query.list_size as string) || 10

		const offset = (page - 1) * listSize
		const { count, rows } = await File.findAndCountAll({
			offset,
			limit: listSize,
			order: [['uploadedAt', 'DESC']],
		})

		res.json({
			total: count,
			page,
			list_size: listSize,
			pages: Math.ceil(count / listSize),
			files: rows,
		})
	}

	getOne = async (req: Request, res: Response) => {
		const id = req.params.id

		const file = await File.findByPk(id)

		if (!file) {
			return res.status(404).json({ message: 'File not found' })
		}

		res.json(file)
	}

	download = async (req: Request, res: Response) => {
		try {
			const id = req.params.id
			const file = await File.findByPk(id)

			if (!file) {
				return res.status(404).json({ message: 'File not found' })
			}

			const absolutePath = path.resolve(file.path)

			if (!fs.existsSync(absolutePath)) {
				return res
					.status(410)
					.json({ message: 'File no longer exists on server' })
			}

			res.download(absolutePath, file.originalName)
		} catch (error) {
			res.status(500).json({ message: (error as Error).message })
		}
	}

	delete = async (req: Request, res: Response) => {
		const id = req.params.id

		const file = await File.findByPk(id)

		if (!file) {
			return res.status(404).json({ message: 'File not found' })
		}

		try {
			// Удалить физический файл
			await fsp.unlink(file.path)
		} catch (err) {
			// Если файл уже удалён из диска — ничего страшного
			console.warn(`File already missing: ${file.path}`)
		}

		await file.destroy()

		res.json({ message: 'File deleted successfully' })
	}

	update = async (req: Request, res: Response) => {
		const id = req.params.id

		const existingFile = await File.findByPk(id)

		if (!existingFile) {
			return res.status(404).json({ message: 'File not found' })
		}

		if (!req.file) {
			return res.status(400).json({ message: 'No file uploaded' })
		}

		try {
			// Удалить старый файл с диска
			await fsp.unlink(existingFile.path)
		} catch (err) {
			console.warn(`Old file not found for deletion: ${existingFile.path}`)
		}

		const { originalname, mimetype, size, filename, path: filePath } = req.file
		const extension = path.extname(originalname).replace('.', '')

		existingFile.originalName = originalname
		existingFile.extension = extension
		existingFile.mimeType = mimetype
		existingFile.size = size
		existingFile.path = filePath
		existingFile.uploadedAt = new Date()

		await existingFile.save()

		res.json({ message: 'File updated', file: existingFile })
	}
}
