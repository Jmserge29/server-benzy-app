import {Router} from 'express'
import UserCtrl from '../Controllers/UserController.js'
import {verifyToken, isAdmin, isModerator} from '../Middlewares/verifytoken.js'
const router = Router()

//Routes
router.post('/signin', UserCtrl.signIn)
router.post('/signup', UserCtrl.signUp)
router.post('/signout', UserCtrl.signOut)
router.get('/users',UserCtrl.getUsers)
router.post('/dashboard', UserCtrl.dataUser)
router.post('/registration/:matter', UserCtrl.registration)
router.post('/assignation/:assignation', UserCtrl.assignation)

export default router;