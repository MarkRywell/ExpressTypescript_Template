# First stage: build the application
FROM node:20.5.1-bookworm-slim AS build

WORKDIR /app

COPY package*.json ./

# Install all dependencies including dev dependencies
RUN npm install pm2 -g
RUN npm install && npm ci

COPY . .

# Build the application
RUN npm run build

# Second stage: production
FROM node:20.5.1-bookworm-slim AS production

WORKDIR /app

COPY --from=build /app /app

# Install only production dependencies
RUN npm ci --only=production

RUN chown -R node:node /app

USER node

# Expose the port your app runs on
EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]
