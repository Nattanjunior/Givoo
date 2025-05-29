"use server"

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const changeNameSchema = z.object({
    name: z.string().min(4, "O username deve ter no mínimo 4 caracteres"),
})

type ChangeName = z.infer<typeof changeNameSchema>

export async function changeName(data: ChangeName) {
    const session = await auth()
    const userId = session?.user.id

    if (!userId) {
        return {
            data: null,
            error: "Usuário não autenticado"
        }
    }


    const validation = changeNameSchema.safeParse(data)

    if (!validation.success) {
        return {
            data: null,
            error: validation.error.issues[0].message
        }
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name: data.name
            }
        })

        return {
            data: user.name,
            error: null
        }

    } catch (error) {
        console.error(error)
        return {
            data: null,
            error: 'Error ao salvar alterações'
        }
    }

}