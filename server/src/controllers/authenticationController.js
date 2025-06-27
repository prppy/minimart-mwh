import * as userModel from "../models/userModel.js";

export const createUser = async (req, res, next) => {
  try {
    const { username } = req.body
    const { hashedPassword } = res.locals

    if (!username || !hashedPassword) {
      res.status(404).json({
        "message": "missing required fields"
      })
    }

    const userId = await userModel.insertUser(username, hashedPassword)

    res.locals.userId = userId
    next()

  } catch (e) {
    console.error(e.message)
    res.status(400).json({
      "message": "An error has occurred"
    })
  }
}

export const checkUserExists = async (req, res, next) => {
  try {
    const { username } = req.body

    if (!username) {
      return res.status(404).json({
        "message": "missing required fields"
      })
    }

    const selectedUser = await userModel.selectUserByUsername(username)

    if (selectedUser != null) {
      return res.status(404).json({
        "message": "User already exists"
      })
    }

    next()

  } catch (e) {
    console.error(e.message)
    res.status(400).json({
      "message": "An error has occurred"
    })
  }
}

export const validateUserCredentials = async (req, res, next) => {
  try {
    const { username } = req.body

    if (!username) {
      return res.status(404).json({
        "message": "missing required fields"
      })
    }

    const selectedUser = await userModel.selectUserByUsername(username)

    if (selectedUser == null) {
      return res.status(404).json({
        "message": "Wrong username or password"
      })
    }

    res.locals.userId = selectedUser.id
    res.locals.hashedPassword = selectedUser.password

    next()

  } catch (e) {
    console.error(e.message)
    res.status(400).json({
      "message": "An error has occurred"
    })
  }
}

export const sendAuthResponse = async (req, res) => {
  try {
    const { accessToken, refreshToken } = res.locals

    if (!accessToken || !refreshToken) {
      res.status(403).json({
        "message": "illegal entry"
      })
    }

    res.status(200).json({
      "message": "User can now access system",
      "accessToken": accessToken,
      "refreshToken": refreshToken,
    })

  } catch (e) {
    console.error(e.message)
    res.status(400).json({
      "message": "An error has occurred"
    })
  }
}