FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
