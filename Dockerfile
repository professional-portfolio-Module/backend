# ---- Stage 1: Install all dependencies & Build ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN npm ci

COPY src ./src
RUN npm run build

# ---- Stage 2: Install production dependencies ----
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ---- Stage 3: Final Production image ----
FROM node:20-alpine AS production

WORKDIR /app

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only production dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy compiled code from build stage
COPY --from=build /app/dist ./dist
COPY package.json ./

# Switch to non-root user
USER appuser

# Expose the application port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

# Start the application from the compiled JS in dist/
CMD ["node", "dist/server.js"]
