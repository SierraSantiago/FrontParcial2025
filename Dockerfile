# ---------- Build ----------
FROM node:20-slim AS builder
WORKDIR /app

# Dependencias
COPY package*.json ./
RUN npm ci

# Copia código y configs
COPY . .

# (Opcional) Si tienes .env.production, Next lo leerá en build
# COPY .env.production ./.env.production

# Compila a .next (standalone)
RUN npm run build && npm cache clean --force

# ---------- Runner ----------
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000

# Copia el runtime mínimo standalone + estáticos
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
