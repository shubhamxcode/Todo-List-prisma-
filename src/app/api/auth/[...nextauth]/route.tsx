import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { UserService } from "../../../../services/userService"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn(params: any) {
      const { user, account } = params
      
      if (account?.provider === "github" && user.email && user.name) {
        try {
          await UserService.findOrCreateUser(user.email, user.name)
          return true
        } catch (error) {
          console.error("Authentication error:", error)
          return false
        }
      }
      return true
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
