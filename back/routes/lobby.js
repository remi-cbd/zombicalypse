import { JsonDB, Config } from 'node-json-db';
var db = new JsonDB(new Config("myDataBase", true, false, '/'));

import express from 'express';
const router = express.Router()

// hostname: 'localhost',
// port: 3000,
// path: '/selectCharacter',
// method: 'POST',
// body: JSON.stringify({
// 	id: 2,
// 	characterID: 0,
// 	characterName: playerName,
// 	userID: props.userId
// }),


router.post('/selectCharacter', (req, res) => {
	console.log('selectCharacter');
});

router.post('/ready', (req, res) => {
	console.log('ready');
});

export default router
