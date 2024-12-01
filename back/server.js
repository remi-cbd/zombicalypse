// modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
// files
import db from './db.js'
import wss from './websocket.js'
import lobby from './routes/lobby.js';

const app = express()

const hostname = 'localhost'
const port = 3000

app.use(cors());

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/players', async (req, res) => {
    var data = await db.getData("/clients");
    res.send(data);
})

app.get('/connect', async (req, res) => {
    var data = await db.getData("/clients");
    if (data.clients.length >= 6) {
        res.status(401).send("Max clients reached");
        return;
    }
    let uuid = uuidv4();
    let clientIP = req.socket.remoteAddress;

    await db.push("/clients", {
        clients: [
            {
                userID: uuid,
                clientIP: clientIP,
                status: 'pending',
                ws: null,
            },
        ],
    }, false);
    data = await db.getData("/clients");
    console.log(`HTTP-| Client pending: ${clientIP} : ${uuid}`);
    res.send({userID: uuid});
})

app.use('/lobby', lobby);

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, hostname, () => {
    console.log(`Http server : http://${hostname}:${port}`)
})
