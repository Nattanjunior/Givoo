"use server"

import { prisma } from '@/lib/prisma'
import { z } from 'zod'


const getInfoUserSchema = z.object({
    username: z.string({ message: 'O username é obrigatório' }),
})

type GetInfoUserSchema = z.infer<typeof getInfoUserSchema>

export async function getInfoUser(data: GetInfoUserSchema) {
    const schema = getInfoUserSchema.safeParse(data);

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