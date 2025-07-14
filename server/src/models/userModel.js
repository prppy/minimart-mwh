// dependencies
import { PrismaClient } from "../generated/prisma/client.js"

const prisma = new PrismaClient();

/**
 * Inserts resident to MWH_User and MWH_Officer tables
 * @param {*} username 
 * @param {*} hashedpassword 
 * @param {*} userRole 
 * @returns 
 */
export const insertOfficer = async (
    username, 
    hashedpassword, 
    userRole, 
    Officer_Email
) => {
    try {
        const result = await prisma.$transaction(async (prisma) => {
            // insert into mwh_user
            const createdUser = await prisma.mWH_User.create({
                data: {
                    User_Name: username,
                    Password_Hash: hashedpassword,
                    User_Role: userRole,
                }
            });

            // insert into mwh_resident
            const createdOfficer = await prisma.mWH_Officer.create({
                data: {
                    User_ID: createdUser.User_ID,
                    Officer_Email: Officer_Email,
                }
            });

            return createdUser.User_ID
        });

        return result.userId;
    } catch (error) {
        if (error.code === 'P2002') {
            throw new Error('Username already exists');
        }
        if (error.code === 'P2003') {
            throw new Error('Foreign key constraint failed');
        }
        
        console.error('Transaction failed:', error);
        
        throw new Error('Failed to create resident account');
    }
}

/**
 * Inserts resident to MWH_User and MWH_Resident tables
 * @param {*} username 
 * @param {*} hashedpassword 
 * @param {*} userRole 
 * @param {*} Date_Of_Birth 
 * @param {*} Date_Of_Admission 
 * @param {*} Last_Abscondence 
 * @returns 
 */
export const insertResident = async (
    username, 
    hashedpassword, 
    userRole, 
    Date_Of_Birth, 
    Date_Of_Admission, 
    Last_Abscondence
) => {
    try {
        const result = await prisma.$transaction(async (prisma) => {
            // insert into mwh_user
            const createdUser = await prisma.mWH_User.create({
                data: {
                    User_Name: username,
                    Password_Hash: hashedpassword,
                    User_Role: userRole,
                }
            });

            // insert into mwh_resident
            const createdResident = await prisma.mWH_Resident.create({
                data: {
                    User_ID: createdUser.User_ID,
                    Date_Of_Birth: Date_Of_Birth,
                    Date_Of_Admission: Date_Of_Admission,
                    Last_Abscondence: Last_Abscondence,
                }
            });

            return createdUser.User_ID;
        });

        return result.userId;
    } catch (error) {
        if (error.code === 'P2002') {
            throw new Error('Username already exists');
        }
        if (error.code === 'P2003') {
            throw new Error('Foreign key constraint failed');
        }
        
        console.error('Transaction failed:', error);
        
        throw new Error('Failed to create resident account');
    }
}

/**
 * Inserts developer to MWH_User table (no linking table for developer role)
 * @param {*} username 
 * @param {*} hashedpassword 
 */
export const insertDeveloper = async (username, hashedpassword, userRole) => {
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