FROM node:18

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .

COPY . .

EXPOSE 3000
CMD ["npm", "start"]