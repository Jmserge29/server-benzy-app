// Import dependences
import {Router} from 'express'
import {verifyToken, isAdmin, isModerator} from '../Middlewares/verifytoken.js'
import AssignationCtrl from '../Controllers/AssignationController.js'
const router = Router()

// Routes
router.get('/api', AssignationCtrl.getAssignations)
router.post('/creating',  AssignationCtrl.createAssignation)
router.delete('/deleting', [verifyToken, isModerator || isAdmin], AssignationCtrl.deleteAssigantion)
router.put('/updating', [verifyToken, isModerator], AssignationCtrl.updateAssigantion)
router.put('/checking/:assignation', AssignationCtrl.checkAssignation)
router.get('/id/:id', AssignationCtrl.getAssigantionById)

export default router;