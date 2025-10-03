import express from 'express';
import { v4 as uuidv4 } from 'uuid'
import db from '../db.js'

const router = express.Router()

router.get('/players', async (req, res) => {
    var data = await db.getData("/clients")
    res.send(data)
})
router.get('/connect', async (req, res) => {
    var data = await db.getData("/clients")
    if (data.clients.length >= 6) {
        res.status(401).send("Max clients reached")
        return
    }
    let uuid = uuidv4()
    let clientIP = req.socket.remoteAddress

    await db.push("/clients", {
        clients: [
            {
                userID: uuid,
                clientIP: clientIP,
                status: 'pending',
                ws: null,
            },
        ],
    }, false)

    console.log(`HTTP-| Client pending: ${clientIP} : ${uuid}`)
    res.send({ userID: uuid })
})

export default router
