# Givoo (Em desenvolvimento)

[![Deploy Vercel](https://vercel.com/button)](https://givoo.vercel.app/)

**URL de produção:** [https://givoo.vercel.app/](https://givoo.vercel.app/)

---

## Descrição
Givoo é uma plataforma de doações simples, segura e integrada ao Stripe. Ideal para todos, streamers, produtores de conteúdo e vários outros que desejam monetizar seu trabalho online.

---

## Funcionalidades
- **Página personalizada para cada usuário**
- **Recebimento de doações via Stripe**
- **Dashboard com estatísticas de doações**
- **Gestão de perfil (nome, bio, imagem, username customizável)** 
- **Login seguro via GitHub OAuth**
- **Mensagens personalizadas dos apoiadores**
- **Integração com Stripe Express para onboarding e dashboard financeiro**

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

## Configuração Local

1. **Clone o repositório e instale as dependências:**
   ```bash
   git clone https://github.com/Nattanjunior/givoo.git
   cd givoo
   npm install # ou yarn install
   ```

2. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto e configure as seguintes variáveis:

   ```env
   # Database (PostgreSQL)
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

   # NextAuth
   AUTH_SECRET="your_secure_secret_key"

   # GitHub OAuth (https://github.com/settings/developers)
   GITHUB_CLIENT_ID="your_github_client_id"
   GITHUB_CLIENT_SECRET="your_github_client_secret"

   # Stripe (https://dashboard.stripe.com/apikeys)
   STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
   STRIPE_WEBHOOK_SECRET="whsec_your_stripe_webhook_secret"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key"

   # Application URLs
   NEXT_PUBLIC_HOST_URL="http://localhost:3000/"
   HOST_URL="http://localhost:3000/"
   ```

3. **Configure o banco de dados e o Stripe:**
   ```bash
   # Instale a CLI do Stripe (necessário para webhooks locais)
   npm install -g stripe-cli

   # Configure o banco de dados
   npx prisma generate
   npx prisma migrate dev

   # Em outro terminal, inicie o listener de webhooks do Stripe
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev # ou yarn dev
   ```

   O projeto estará rodando em `http://localhost:3000`

5. **Configurações adicionais recomendadas:**
   - Configure seu projeto no [GitHub OAuth](https://github.com/settings/developers)
   - Crie uma conta no [Stripe](https://stripe.com) e configure as chaves
   - Para testes, use os [cartões de teste do Stripe](https://stripe.com/docs/testing#cards)
   - Configure o [PostgreSQL](https://www.postgresql.org/download/) localmente ou use um serviço como [Railway](https://railway.app)

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
