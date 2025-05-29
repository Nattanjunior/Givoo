"use server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createSlug } from "@/utils/create-slug";

const formSchema = z.object({
    username: z.string({ message: "O username é obrigatório" }).min(4, "O username deve ter pelo menos 4 caracteres"),
})

type CreateUserNameFormData = z.infer<typeof formSchema>;
export async function createUsername(data: CreateUserNameFormData) {

    const session = await auth();
    if (!session?.user) {
        return {
            success: false,
            message: "Não autorizado",
        }
    }


    const schema = formSchema.safeParse(data);
    if (!schema.success) {
        return {
            success: false,
            message: schema.error.issues[0].message,
        }
    }

    try {
        const userId = session.user.id;
        const slug = createSlug(data.username);
        const existSlug = await prisma.user.findFirst({
            where: {
                username: slug,
            },
        })

        if (existSlug) {
            return {
                success: false,
                message: "Username ja existe, tente outro.",
            }
        }

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                username: slug,
            },
        });

        return {
            data: slug,
            success: true,
            message: "Username atualizado com sucesso",
        }

    } catch (error) {
        return {
            success: false,
            message: "Ocorreu um erro ao atualizar o username",
        }
    }
}