import { PrismaClient } from "../generated/prisma"

const prisma = new PrismaClient()

export class UserService {
    static async findOrCreateUser(email: string, name: string) {
        try {
            // Check if user already exists
            let user = await prisma.user.findUnique({
                where: { email }
            })
            
            // If user doesn't exist, create them
            if (!user) {
                user = await prisma.user.create({
                    data: {
                        email,
                        name
                    }
                })
                console.log("New user created:", user.id)
            } else {
                console.log("Existing user found:", user.id)
            }
            
            return user
        } catch (error) {
            console.error("Error in findOrCreateUser:", error)
            throw error
        }
    }
} 