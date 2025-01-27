# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application files
COPY . .

# Install PM2 globally
RUN npm install -g pm2

# Expose the port (8000 in this case)
EXPOSE 8000

# Start the application using PM2
CMD ["pm2-runtime", "start", "index.js", "--name", "EMPIRE-MD"]
