import express from 'express'
// import expressWs from 'express-ws'
import bodyParser from 'body-parser'
import cors from 'cors'
import isAuthenticated from './middleware/auth.js'
import auth from './routes/auth.js'
// import * as websocket from './services/websocket.js'

const hostname = process.env.BACK_HOST
const port = process.env.BACK_PORT

// HTTP Server
const app = express()

// WS Server
// const wsInstance = expressWs(app)
// websocket.initialize(wsInstance.getWss())
// const wsRouter = await import('./routes/websocket.js')

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(isAuthenticated)

// HTTP Routes
app.use('/auth', auth)

// WS Routes
// app.ws('/ws', wsRouter)

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// Listen
app.listen(port, hostname, () => {
    console.log(`Http server : http://${hostname}:${port}`)
    // console.log(`WS server : ws://${hostname}:${port}`)
})
