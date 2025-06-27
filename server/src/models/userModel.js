// dependencies
import { PrismaClient } from "../generated/prisma/client.js"

const prisma = new PrismaClient();

/**
 * Add user to rehabify_user
 * @param {*} username 
 * @param {*} hashedpassword 
 */
export const insertUser = async (username, hashedpassword) => {
    const userData = {
        username: username,
        password: hashedpassword,
    }

    const createdUser = await prisma.rehabify_user.create({ data: userData })

    return createdUser.id
}

export const selectUserByUsername = async (username) => {
    const selectedUser = await prisma.rehabify_user.findFirst({
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