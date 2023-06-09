import express from 'express'
import { UserControl } from './user.control'
const router = express.Router()

router.post('/create-user', UserControl.createUser)

export const UserRoutes = router
