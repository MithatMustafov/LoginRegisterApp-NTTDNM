# Use the official Node.js 18 image for building the application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application for production
RUN npm run build

# Use a lighter image for production
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app ./

# Expose the port the app runs on
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "start"]
