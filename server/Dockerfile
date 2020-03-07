FROM node:12.16.1-slim

ENV NODE_ENV="production"
ENV LOG_LEVEL="warn"
ENV PORT="3000"

WORKDIR /app
COPY package.json ./app
RUN yarn install --production=true --frozen-lockfile --silent
COPY . /app
CMD ["yarn", "start:production"]
