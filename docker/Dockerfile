FROM node:22.16.0-slim
WORKDIR /app
RUN cd ..
COPY package*.json ./
RUN npm install
COPY .. .
CMD ["npm", "start"]