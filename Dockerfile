FROM node:20.5.1-bookworm-slim

ENV NODE_ENV production

WORKDIR /app

COPY package*.json ./

RUN npm install pm2 -g

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

RUN chown -R node:node /app

USER node

CMD ["pm2-runtime", "ecosystem.config.js"]