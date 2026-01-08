# ---- Build stage ----
FROM node:20-bookworm-slim AS build
WORKDIR /app

# Install deps (including dev deps needed for Vite/tsx build)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM node:20-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy built output
COPY --from=build /app/dist ./dist

# Cloud Run provides PORT (usually 8080). Your server reads PORT already.
EXPOSE 8080
CMD ["node", "dist/index.cjs"]
