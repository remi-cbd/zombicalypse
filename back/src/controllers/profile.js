import { updateUserProfile } from '../services/db.js'

const get = async (req, res) => {
	console.log(`profile.js get() -> req.user = ${JSON.stringify(req.user)}`)
	return res.status(200).json({ user: req.user })
}

const update = async (req, res) => {
	const { name } = req.body
	const avatar = req.file ? req.file.filename : null

	if (!name && !avatar)
		return res.status(400).json({ error: 'No fields to update' })

	const profile = await updateUserProfile(req.user.uuid, { name, avatar })

	return profile !== null ?
		res.status(200).json({ profile }) :
		res.status(500).json({ error: 'Failed to update profile' })
}

export {
	get,
	update,
}
