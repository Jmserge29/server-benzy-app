import DepartmentCtrl from '../Controllers/DepartmentController.js'
import { Router } from 'express'
const app = Router()

app.get('/api', DepartmentCtrl.getDepartments)