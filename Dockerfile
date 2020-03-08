FROM node:12.16.1-slim

ENV NODE_ENV="production"
ENV PORT="3000"

WORKDIR /app
COPY ./server/package.json /app
RUN yarn install --production=true --frozen-lockfile --silent
COPY ./server /app

EXPOSE $PORT

CMD ["yarn", "start:production"]
