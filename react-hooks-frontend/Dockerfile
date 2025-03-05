     FROM node:16 AS build

     WORKDIR /app

   # Copy local node_modules to avoid network dependency issues
     COPY package.json package-lock.json ./
    RUN npm config set timeout 600000 \
    && npm config set registry https://registry.npmmirror.com \
   && npm config set strict-ssl false

 COPY . .
 RUN npm install --offline || npm install --legacy-peer-deps --force

 RUN npm run build

 FROM nginx:alpine
 COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
