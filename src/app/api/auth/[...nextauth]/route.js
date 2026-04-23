import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Exporting authOptions so we can read the session in our server pages
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 1. ADMIN USER (Sees Everything)
        if (credentials?.username === "admin" && credentials?.password === "blackzero") {
          return { id: "1", name: "Teknora Admin", email: "admin@Teknora.com", role: "admin" };
        }
        
        // 2. STANDARD USER (Financials Hidden)
        if (credentials?.username === "user" && credentials?.password === "12345678") {
          return { id: "2", name: "Factory User", email: "user@Teknora.com", role: "user" };
        }
        
        return null; // Login failed
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || "Teknora_factory_secret_key_secure_123",
  session: {
    strategy: "jwt",
  },
  // This passes the "role" from the login check down to the browser session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };