FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npx vite build

FROM nginx:alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker-entrypoint.sh /docker-entrypoint-custom.sh
RUN sed -i 's/\r$//' /docker-entrypoint-custom.sh && chmod +x /docker-entrypoint-custom.sh

EXPOSE 80 443

CMD ["/docker-entrypoint-custom.sh"]
