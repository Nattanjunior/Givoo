"use server"

import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { z } from 'zod'


const createPaymentSchema = z.object({
  slug: z.string().min(1, "Slug do creator e obrigatorio"),
  name: z.string().min(1, "O nome precisa ter pelo menos 1 letra."),
  message: z.string().min(5, "A mensagem precisa ter pelo menos 5 letras."),
  price: z.number().min(1000, "Selecione um valor maior que R$10"),
  creatorId: z.string()
})

type CreatePaymentSchema = z.infer<typeof createPaymentSchema>

export async function createPayment(data: CreatePaymentSchema) {

  const schema = createPaymentSchema.safeParse(data)

  if (!schema.success) {
    return {
      data: null,
      error: schema.error.issues[0].message
    }
  }

  try {
    const creator = await prisma.user.findUnique({
      where: {
        id: data.creatorId
      }
    })

    if (!creator) {
      return {
        data: null,
        error: "Falha ao criar pagamento, tente mais tarde"
      }
    }


    const applicationFeesAccount = Math.floor(data.price * 0.1)

    const donation = await prisma.donation.create({
      data: {
        donorName: data.name,
        donorMessage: data.message,
        userId: creator.id,
        status: "PENDING",
        amount: (data.price - applicationFeesAccount)
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.HOST_URL}/creator/${data.slug}`,
      cancel_url: `${process.env.HOST_URL}/creator/${data.slug}`,
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Apoiar " + creator.name
            },
            unit_amount: data.price,
          },
          quantity: 1,
        }
      ],
      payment_intent_data: {
        application_fee_amount: applicationFeesAccount,
        transfer_data: {
          destination: creator.connectedStripeAccountId as string
        },
        metadata: {
          donorName: data.name,
          donorMessage: data.message,
          donationId: donation.id
        }
      }
    })

    return {
      sessionId: session.id
    }


  } catch (error) {
    return {
      error: "Falha ao criar pagamento, tente mais tarde"
    }
  }
}