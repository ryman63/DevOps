# Стадия сборки
FROM node:18-alpine as builder

WORKDIR /app
# Копируем только файлы зависимостей (оптимизация кэша)
COPY package.json package-lock.json ./
RUN npm cache clean --force && npm ci

# Копируем остальные файлы проекта
COPY . .
RUN npm run build

# Стадия запуска (nginx)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Если используете кастомный nginx.conf, убедитесь, что он существует
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
