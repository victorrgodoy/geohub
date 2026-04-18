# ============================================
# ESTÁGIO 1 - Build (node entra, node sai)
# ============================================
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Variáveis do Vite precisam existir em tempo de build
ARG VITE_BACKEND_API_URL
ARG VITE_WORLD_BANK_API_URL
ENV VITE_BACKEND_API_URL=$VITE_BACKEND_API_URL
ENV VITE_WORLD_BANK_API_URL=$VITE_WORLD_BANK_API_URL

# Gera a pasta /dist com HTML, CSS, JS estáticos
RUN npm run build

# ============================================
# ESTÁGIO 2 - Produção (só Nginx, sem Node.js)
# ============================================
FROM nginx:alpine

# Copia apenas o /dist do estágio anterior, descarta todo o resto
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]