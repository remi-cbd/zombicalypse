import * as pg from 'pg'

const pool = new pg.Pool({
	host: process.env.POSTGRES_HOST,
	port: process.env.POSTGRES_PORT,
	database: process.env.POSTGRES_DB,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	max: 10,
	idleTimeoutMillis: 10000,
	connectionTimeoutMillis: 0,
})

const addUser = async (name, email, password) => {
	return pool
		.query('INSERT INTO zombicide.users (name, email, password, registration_date) VALUES ($1, $2, $3, now()) RETURNING *', [name, email, password])
		.then((result) => {
			return result.rows[0]
		})
		.catch((error) => {
			console.error('Database query error:', error)
			return null
		})
}

const getUserByEmail = async (email) => {
	return pool
		.query('SELECT * FROM zombicide.users WHERE email = $1 LIMIT 1', [email])
		.then((result) => {
			return result.rows[0]
		})
		.catch((error) => {
			console.error('Database query error:', error)
			return null
		})
}

const resetPasswordToken = async (id, token) => {
	return pool
		.query(`UPDATE zombicide.users SET password_reset_token = $1, password_reset_token_expiration = NOW() + INTERVAL '1 hour' WHERE id = $2 RETURNING *`, [token, id])
		.then((result) => {
			return result.rows[0]
		})
		.catch((error) => {
			console.error('Database query error:', error)
			return null
		})
}

export {
	addUser,
	getUserByEmail,
	resetPasswordToken
}
