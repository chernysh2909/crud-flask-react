FROM node:16-alpine
WORKDIR /client
COPY . .
RUN npm install vite
RUN npm run build
EXPOSE 3000
CMD [ "npx", "serve", "dist" ]