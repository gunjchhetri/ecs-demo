
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run compile
RUN npm run copy-schema
EXPOSE 80

# Command to run the application
CMD ["node", "./dist/index.js"]
