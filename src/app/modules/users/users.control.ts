import { Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body

    const result = await usersService.createUser(user)
    res.status(200).send({
      data: result,
      success: true,
      message: 'Successfully create user',
    })
  } catch (error: any) {
    console.log(error.message)
    res.status(400).json({
      success: false,
      message: 'faild to create user',
    })
  }
}

export default {
  createUser,
}
