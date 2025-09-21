import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function createUser(email: string, name: string) {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })
        
        // If user doesn't exist, create them
        if (!existingUser) {
            const newUser = await prisma.user.create({
                data: {
                    email,
                    name
                }
            })
            console.log("User created successfully:", newUser.id)
            return newUser
        } else {
            console.log("User already exists:", existingUser.id)
            return existingUser
        }
    } catch (error) {
        console.error("Error creating user:", error)
        throw error
    }
}

export default createUser

