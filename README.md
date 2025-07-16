# ApoiaDev

[![Deploy Vercel](https://vercel.com/button)](https://apoia-devv.vercel.app/)

**URL de produção:** [https://apoia-dev-nxyo.vercel.app/](https://apoia-devv.vercel.app/)

---

## Descrição
ApoiaDev é uma plataforma moderna para criadores de conteúdo receberem doações e apoios de sua comunidade de forma simples, segura e integrada ao Stripe. Ideal para desenvolvedores, streamers, educadores e produtores de conteúdo que desejam monetizar seu trabalho online e criar uma conexão direta com seus apoiadores.

---

## Funcionalidades
- **Página personalizada para cada criador**
- **Recebimento de doações via Stripe**
- **Dashboard com estatísticas de doações**
- **Gestão de perfil do criador (nome, bio, imagem, username customizável)**
- **Login seguro via GitHub OAuth**
- **Mensagens personalizadas dos apoiadores**
- **Integração com Stripe Express para onboarding e dashboard financeiro**
- **Experiência responsiva e moderna**

---

## Tecnologias Utilizadas
- **Next.js 15** (App Router)
- **TypeScript**
- **Prisma ORM** (PostgreSQL)
- **Stripe API**
- **NextAuth.js** (autenticação via GitHub)
- **React Query**
- **TailwindCSS**
- **Vercel** (deploy serverless)

---

## Como rodar localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Nattanjunior/ApoiaDev.git
   cd ApoiaDev
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env.local` baseado no exemplo abaixo:
   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=sua_secret
   GITHUB_CLIENT_ID=xxxxxx
   GITHUB_CLIENT_SECRET=xxxxxx
   STRIPE_SECRET_KEY=sk_test_xxx
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   NEXT_PUBLIC_HOST_URL=http://localhost:3000/
   HOST_URL=http://localhost:3000/
   ```
4. **Rode as migrations do banco:**
   ```bash
   npx prisma migrate dev
   ```
5. **Inicie o projeto:**
   ```bash
   npm run dev
   ```

---

## Deploy em produção
O projeto está publicado em: [https://apoia-dev-nxyo.vercel.app/](https://apoia-dev-nxyo.vercel.app/)

Para deploy próprio, configure as variáveis de ambiente no painel da Vercel, incluindo:
- `DATABASE_URL`
- `NEXTAUTH_URL` (ex: https://seu-dominio.vercel.app)
- `NEXTAUTH_SECRET`
- `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET`
- `STRIPE_SECRET_KEY` e `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_HOST_URL` (ex: https://seu-dominio.vercel.app/)
- `HOST_URL` (ex: https://seu-dominio.vercel.app/)

**Importante:**
- No GitHub OAuth App, adicione os dois callbacks:
  - `http://localhost:3000/api/auth/callback/github`
  - `https://apoia-dev-nxyo.vercel.app/api/auth/callback/github`
- No Stripe, configure o webhook para: `https://apoia-dev-nxyo.vercel.app/api/stripe/webhook`

---

## Estrutura de Pastas
- `src/app/` — Rotas, páginas e APIs
- `src/components/` — Componentes reutilizáveis
- `src/lib/` — Configurações de autenticação, Stripe e Prisma
- `src/providers/` — Providers globais (ex: React Query)
- `prisma/` — Migrations e schema do banco

---

## Principais arquivos e funções
- **Autenticação:** `src/app/api/auth/[...nextauth]/route.ts`
- **Doações:** `src/app/api/donates/route.ts`, `src/app/creator/[username]/actions/create-payment.ts`
- **Dashboard:** `src/app/dashboard/`
- **Onboarding Stripe:** `src/app/api/stripe/create-account/route.ts`
- **Webhook Stripe:** `src/app/api/stripe/webhook/route.ts`

---

## Observações e dicas
- Sempre rode `prisma generate` antes do build (já incluso no script de build)
- O projeto é modular, fácil de escalar e customizar
- Siga as boas práticas de segurança ao lidar com chaves e secrets
- Para dúvidas, consulte a documentação oficial das libs utilizadas

---

## Licença
MIT

---

Projeto desenvolvido por [Nattan Junior](https://github.com/Nattanjunior) e colaboradores.
