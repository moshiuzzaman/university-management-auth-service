import express from 'express'
import usersControl from './users.control'
const router = express.Router()

router.post('/create-user', usersControl.createUser)

export default router
