# 📦 Delivery Tracker Pro

Sistema Fullstack para **gestão de entregas e entregadores**, com autenticação JWT, interface protegida e um dashboard moderno e responsivo.

> Projeto desenvolvido com foco em boas práticas, ideal para empresas de logística, transportadoras e também como portfólio profissional.

---

## 🛠️ Tecnologias Utilizadas

### ✅ **Frontend** – React + Vite + Tailwind

- **React 18**
- **Vite** – build ultrarrápido
- **Tailwind CSS** – UI moderna e responsiva
- **React Router DOM** – rotas protegidas
- **Axios** – comunicação com a API
- **Lucide React** – ícones modernos
- **Zod** – validação de formulários
- **Context API + LocalStorage** – controle de autenticação

### ✅ **Backend** – Node.js + Express + Prisma

- **Node.js / TypeScript**
- **Express** – API REST
- **Prisma ORM** – conexão com PostgreSQL
- **JWT (jsonwebtoken)** – autenticação segura
- **bcryptjs** – hash de senhas
- **dotenv** – variáveis de ambiente
- **CORS** – segurança de origem
- **PostgreSQL** – banco de dados relacional

---

## 🖼️ Funcionalidades

- ✅ Login com autenticação JWT
- ✅ Painel de entregas com listagem, criação, edição e exclusão
- ✅ Painel de entregadores com CRUD completo
- ✅ Dashboard com métricas visuais e cards clicáveis
- ✅ Filtro por nome/email nas listagens
- ✅ Formulários com validação usando Zod
- ✅ Rotas privadas protegidas por contexto
- ✅ Responsivo para desktop e mobile

---

## ⚙️ Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/delivery-tracker-pro.git
cd delivery-tracker-pro

# Instale as dependências do backend
cd backend
npm install

# Configure o .env
cp .env.example .env
# edite as variáveis: DATABASE_URL, JWT_SECRET, PORT

# Rode as migrations do banco
npx prisma migrate dev

# Inicie o backend
npm run dev
