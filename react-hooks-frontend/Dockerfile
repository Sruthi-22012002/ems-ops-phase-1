# Stage 1: Build the React app
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package.json package-lock.json ./

# Ensure dependencies are installed correctly
RUN npm config set timeout 600000 \
    && npm config set registry https://registry.npmmirror.com \
    && npm config set strict-ssl false

# Install dependencies properly
RUN npm install --legacy-peer-deps || npm install --force

# Copy the remaining application files (excluding unnecessary ones)
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Remove default Nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy a custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application files to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3000 (React usually runs on 3000, but Nginx serves on 80)
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

