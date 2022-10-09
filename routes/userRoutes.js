import express from 'express'
import { authUser, registerUser }  from '../controllers/userController.js'

export const userRoutes = express.Router()

userRoutes.route('/').post(registerUser)
userRoutes.route('/login').post(authUser)




