// Imports dependences
import express from 'express'
import dotenv from 'dotenv'
import './DatabaseMongoDB.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import moment from 'moment'

// Imports Routers
import routerUser from './Routes/user.routes.js'
import routerMaterias from './Routes/materias.routes.js'
import routerAssignation from './Routes/assignation.routes.js'

//Import libs - setups 
import {createRoles, createMaterias,creatingAssignation, createDepartment} from './libs/InitialSetup.js'

// Implementation Fuctions and assigned vars
const app = express()
dotenv.config()

// App Uses Rutes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true}))
app.use(express.json())
app.use(cookieParser())
app.use('/User', routerUser)
app.use('/Materia', routerMaterias)
app.use('/Assignation', routerAssignation)

// Server running
app.listen(process.env.PORT_SERVER || 8089, async()=>{
    console.log(`Server in port ${process.env.PORT_SERVER}`)
})
createRoles()
createMaterias()
creatingAssignation()
createDepartment()
var time = moment().format('MMMM Do YYYY, h:mm:ss a');
// Test Routes
app.get('/', (req, res) => {
    res.send('Hi guys!, Whats up?\n'+time)
})