import { JsonDB, Config } from 'node-json-db'

const db = new JsonDB(new Config("zbc", true, true, '/'))
await db.push('/users', [], false)

export default db
