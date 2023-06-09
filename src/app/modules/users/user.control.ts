import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body

    const result = await UserService.createUser(user)
    res.status(200).send({
      data: result,
      success: true,
      message: 'Successfully create user',
    })
  } catch (error: unknown) {
    next(error)
  }
}

export const UserControl = {
  createUser,
}
