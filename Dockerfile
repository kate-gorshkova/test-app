FROM node:16 as builder

RUN mkdir /application
WORKDIR /application

COPY app/package.json /application/package.json
RUN npm install

COPY app /application

RUN npx rollup -c rollup.config.js
RUN node scss-build-script.js

FROM nginx:1.22

COPY --from=builder /application/index.html /usr/share/nginx/html
COPY --from=builder /application/dist /usr/share/nginx/html/static