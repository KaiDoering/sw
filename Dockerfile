FROM node:19.8.1-alpine AS bundler
WORKDIR /usr/build/
COPY . ./
RUN npm ci && npm run build

FROM node:19.8.1-alpine
WORKDIR /usr/src/app/
COPY --from=bundler /usr/build/dist/ assets/
COPY server/ ./
RUN npm ci
EXPOSE 8080
CMD [ "npm", "start" ]