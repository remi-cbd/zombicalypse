import express from 'express'
// import expressWs from 'express-ws'
import { configDotenv } from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import isAuthenticated from './middleware/auth.js'
import errorHandler from './middleware/errorHandler.js'
import auth from './routes/auth.js'
import profile from './routes/profile.js'
// import * as websocket from './services/websocket.js'

configDotenv()

const hostname = process.env.BACK_HOST
const port = process.env.BACK_PORT

// Server
const app = express()
// const wsInstance = expressWs(app)
// websocket.initialize(wsInstance.getWss())
// const wsRouter = await import('./routes/websocket.js')

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(isAuthenticated)

// Routes
app.use('/auth', auth)
app.use('/profile', profile)
// app.ws('/ws', wsRouter)

// Middleware
app.use(errorHandler)

// Start
app.listen(port, hostname, () => {
    console.log(`Http server : http://${hostname}:${port}`)
    // console.log(`WS server : ws://${hostname}:${port}`)
})
