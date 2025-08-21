// Arquivo: gerar-login-link.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function gerarLoginLink() {
  try {
    const loginLink = await stripe.accounts.createLoginLink('acct_1RnQQPPw3RD2ry7F');
  } catch (error) {
    throw new Error("Falha ao criar link de configuração")
  }
}

gerarLoginLink();
