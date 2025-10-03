import express from 'express'
import expressWs from 'express-ws'
import bodyParser from 'body-parser'
import cors from 'cors'
import lobby from './routes/lobby.js'
import index from './routes/index.js'
import * as whatever from './websocket.js'

// Secrets
const hostname = 'localhost'
const port = 3000

// Server
const app = express()
const wsInstance = expressWs(app)
whatever.initialize(wsInstance.getWss())
const wsRouter = await import('./routes/websocket.js')

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// HTTP Routes
app.use('/', index)
app.use('/lobby', lobby)

// WS Routes
app.ws('/ws', wsRouter)

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// Listen
app.listen(port, hostname, () => {
    console.log(`Http server : http://${hostname}:${port}`)
    console.log(`WS server : ws://${hostname}:${port}`)
})
