import NextAuth from "next-auth";
import Github from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET!,
    trustHost: true,
    adapter: PrismaAdapter(prisma),
    providers: [
        Github
    ]
})