FROM node:18-alpine

WORKDIR /app

# Copiar package.json y package-lock (si existe)
COPY package*.json ./

# Instalar dependencias en modo producción
RUN npm ci --only=production

# Copiar el resto del código
COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
