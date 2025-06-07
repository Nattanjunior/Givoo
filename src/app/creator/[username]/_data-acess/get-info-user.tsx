"use server"

import { prisma } from '@/lib/prisma'
import { z } from 'zod'


const createUserSchema = z.object({
    username: z.string({ message: 'O username é obrigatório' }),
})

type CreateUserSchema = z.infer<typeof createUserSchema>

export async function getInfoUser(data: CreateUserSchema) {
    const schema = createUserSchema.safeParse(data);

    if (!schema.success) {
        return {
            success: false,
            message: schema.error.issues[0].message,
        }
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: data.username,
            },
        })

        return user;
    } catch (error) {
        return null;
    }
}