FROM mcr.microsoft.com/playwright:v1.58.2-jammy

WORKDIR /app

RUN corepack enable

# copia tudo
COPY . .

# instala deps (inclui devDependencies)
RUN pnpm install

# builda TS
RUN pnpm build

# debug (MUITO IMPORTANTE)
RUN ls -la dist

EXPOSE 8080

CMD ["pnpm", "start"]