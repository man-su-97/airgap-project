# ---------- Build stage ----------
FROM node:20-alpine AS builder

# Enable pnpm
RUN corepack enable

WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build Next.js
RUN pnpm build


# ---------- Runtime stage ----------
FROM node:20-alpine

RUN corepack enable

WORKDIR /app
ENV NODE_ENV=production

# Copy runtime artifacts
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

EXPOSE 3000

CMD ["pnpm", "start"]
