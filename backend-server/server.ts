import express from 'express'
import { print } from 'listening-on'
import cors from 'cors';

let app = express()
app.use(cors());
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

import { userRoutes } from './routes/user.routes'
app.use(userRoutes);

let port = 8100
app.listen(port, () => {
    print(port)
})