import { JsonDB, Config } from 'node-json-db'

const db = new JsonDB(new Config("myDataBase", true, true, '/'))
await db.push('/clients', { clients: [], })

export default db
