# ---------- build ----------
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Vite собирает в /dist
RUN npm run build

# ---------- runtime ----------
FROM nginx:alpine
# SPA fallback на index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Готовый статик
COPY --from=build /app/dist/ /usr/share/nginx/html/
EXPOSE 80