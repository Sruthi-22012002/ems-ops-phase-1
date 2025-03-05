# Stage 1: Build the React app
FROM node:16 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the correct path
COPY ./package.json ./package-lock.json ./

# Ensure dependencies are installed correctly
RUN npm config set timeout 600000 \
    && npm config set registry https://registry.npmmirror.com \
    && npm config set strict-ssl false

# Install dependencies
RUN npm install --legacy-peer-deps || npm install --force

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Remove default Nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy a custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

