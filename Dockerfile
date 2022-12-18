# Stage 1
FROM node:16 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/booking_bus /usr/share/nginx/htmls