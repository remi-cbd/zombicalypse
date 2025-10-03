import db from '../db.js'

const getUserByEmail = async (email) => {
	const users = await db.getData("/users")
	return Array.isArray(users) ? users.find(user => user.email === email) : null
}

const getUserById = async (uid) => {
	const users = db.getData("/users")
	return Array.isArray(users) ? users.find(user => user.uid === uid) : null
}

export {
	getUserByEmail,
	getUserById
}
