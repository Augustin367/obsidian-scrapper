FROM mcr.microsoft.com/playwright:v1.58.2-jammy

WORKDIR /app

# habilita pnpm
RUN corepack enable

# copia dependências
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# copia código
COPY . .

# builda
RUN pnpm build

# usa porta dinâmica do Railway
EXPOSE 8080

CMD ["pnpm", "start"]