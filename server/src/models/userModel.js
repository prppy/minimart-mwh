// dependencies
import { PrismaClient } from "../generated/prisma/client.js"

const prisma = new PrismaClient();

/**
 * Inserts user to MWH_User table; generic
 * @param {*} username 
 * @param {*} hashedpassword 
 */
export const insertUser = async (username, hashedpassword, userRole) => {
    const userData = {
        User_Name: username,
        Password_Hash: hashedpassword,
        User_Role: userRole,
    }

    const createdUser = await prisma.mWH_User.create({ data: userData })

    return createdUser.User_ID
}

/**
 * selects user from MWH_User table based on userid
 * @param {*} username 
 * @returns 
 */
export const selectUserByUsername = async (username) => {
    const selectedUser = await prisma.mWH_User.findFirst({
        where: {
            username: username
        },
        select: {
            id: true,
            username: true,
            password: true
        }
    })

    if (!selectedUser) {
        return null
    };

    return selectedUser
}