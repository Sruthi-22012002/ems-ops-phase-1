# Use Node.js 16 as the build stage
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before running npm install
COPY package.json package-lock.json ./

# Ensure dependencies are installed correctly
RUN npm config set timeout 600000 \
    && npm config set registry https://registry.npmmirror.com \
    && npm config set strict-ssl false

# Install dependencies properly
RUN npm install --legacy-peer-deps || npm install --force

# Copy the remaining application files
COPY . .

# Build the application
RUN npm run build

# Use Nginx as the final production image
FROM nginx:alpine

# Copy built application files to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

