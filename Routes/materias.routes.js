import {Router} from 'express'
import {verifyToken, isAdmin, isModerator} from '../Middlewares/verifytoken.js'
import MateriasCtrl from '../Controllers/MateriaController.js'
const router = Router()

//Routes
router.get('/api', MateriasCtrl.getMaterias)
router.post('/creating', MateriasCtrl.createMaterias)
router.put('/updating/:id', MateriasCtrl.updateMaterias)
router.delete('/deleting/:id', MateriasCtrl.deleteMaterias)
router.get('/id/:id', MateriasCtrl.getMateriasById)

export default router;