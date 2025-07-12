import * as userModel from "../models/userModel.js";

// create developer in system
export const createDeveloper = async (req, res, next) => {
  try {
    const { User_Name } = req.body
    const { Password_Hash } = res.locals
    const User_Role = "developer"

    if (!User_Name || !Password_Hash) {
      res.status(404).json({
        "message": "missing required fields"
      })
    }

    const User_ID = await userModel.insertUser(User_Name, Password_Hash, User_Role)

    res.locals.User_ID = User_ID
    next()

  } catch (e) {
    console.error(e.message)
    res.status(400).json({
      "message": "An error has occurred"
    })
  }
}

// temporarily not in service
// export const checkUserExists = async (req, res, next) => {
//   try {
//     const { username } = req.body

//     if (!username) {
//       return res.status(404).json({
//         "message": "missing required fields"
//       })
//     }

//     const selectedUser = await userModel.selectUserByUsername(username)

//     if (selectedUser != null) {
//       return res.status(404).json({
//         "message": "User already exists"
//       })
//     }

//     next()

//   } catch (e) {
//     console.error(e.message)
//     res.status(400).json({
//       "message": "An error has occurred"
//     })
//   }
// }

export const validateUserCredentials = async (req, res, next) => {
  try {
    const { User_Name } = req.body

    if (!User_Name) {
      return res.status(404).json({
        "message": "missing required fields"
      })
    }

    const selectedUser = await userModel.selectUserByUsername(User_Name)

    if (selectedUser == null) {
      return res.status(404).json({
        "message": "Wrong username or password"
      })
    }

    res.locals.User_ID = selectedUser.User_ID
    res.locals.Password_Hash = selectedUser.Password_Hash

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