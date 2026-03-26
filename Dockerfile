FROM node:20-alpine

WORKDIR /app

# instala pnpm
RUN npm install -g pnpm

# copia deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# copia código
COPY . .

# builda TS
RUN pnpm build

# expõe porta do fastify
EXPOSE 4001

# inicia servidor
CMD ["pnpm", "start"]